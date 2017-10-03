"use strict";

angular.module('shippersPortalApp')

.run(function ($rootScope, AUTH_EVENTS, AuthStatus, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {

    if($rootScope.accessBlock && AuthStatus.isAuthenticated()) {
      if ($rootScope.accessBlock.validStates.indexOf(next.name) === -1) {
        event.preventDefault();
        $state.go($rootScope.accessBlock.gotoState);  
      } else {
        return;
      }
    }
    else if(next.data.accessBlockState && !AuthStatus.isAuthenticated()) {
      event.preventDefault();
      $state.go('login');
    }
    // Wait until everything is ready
    else if(!AuthStatus.hasLoaded()) {
      event.preventDefault();
      AuthService.init()
      .then(function(response) {
        $state.go(next, nextParams);
      })
      .catch(function(err) {

      })
      return;
    }
    // Only for non-authenticated or blocked users
    else if(AuthStatus.isAuthenticated() && (next.data.noAuthenticate === true || next.data.accessBlockState === true)) {  
      event.preventDefault();
      $state.go('home');
      return;
    }
    // Only for authenticated users
    else if (!AuthStatus.isAuthenticated() && (next.data.noAuthenticate === false || next.data.noAuthenticate === undefined)){
      event.preventDefault();
      $state.go('login');
      return;
    }
    // Check authorization
    else if (!AuthService.isAuthorized(next.data.permissions)) {
      event.preventDefault();
      $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    }
    // Redirection
    if (next.data.redirectTo) {
      event.preventDefault();
      nextParams.id = '';
      $state.go(next.data.redirectTo, nextParams)
    }


  });
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.factory('AuthService', function ($q, $rootScope, AUTH_EVENTS, User, permissions, $window, $filter, $state, $http, ENV, AccessBlockType, analytics) {
  var authService = {};

  
  var userSettings = function() {
    // TODO: Ability to custom user settings based on locale etc.
    return {
      lengthUnit: {
        label: 'mile',
        pluralLabel: 'miles',
        value: 'mile',
        mFactor: 1609.344
      }
    }
  };

  authService.init = function() {
    // Init user/session specific settings here
    var defer = $q.defer();
    $rootScope.accessBlock = null;
    User.getSelf()
    .then(function(response) {
      $rootScope.currentUser = response.data;
      return permissions.getUserPermissions();
    })
    .then(function(response) {
      $rootScope.userPermissions = response;
      $rootScope.userSettings = userSettings();
      analytics.login($rootScope.currentUser.email);
      defer.resolve();
    })
    .catch(function(err) {
      if (err.status === 403) {
        if (err.data.detail) {
          $rootScope.accessBlock = AccessBlockType[err.data.detail];
          $state.go($rootScope.accessBlock.gotoState);
        }
        defer.reject(err);
      }
      defer.reject(err); // Return empty permission array
    });
    return defer.promise;
  }

  authService.login = function (credentials) {
    var defer = $q.defer();
    var url = ENV.APIURL + 'login/';
	//var url="http://localhost:8080/backend/index.php";
	console.log("reuesting url:" +url);
    $http.post(url, {'username': credentials.username, 'password': credentials.password})
    .then(function(response) {
		console.log(response);
      return authService.handleLoginResponse(response);
    })
    .then(function(response) {
      defer.resolve(response);
    })
    .catch(function(err) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      defer.reject(err);
    });
    return defer.promise;
  };

  authService.handleLoginResponse = function (response) {
    var defer = $q.defer();
    var token = response.data.token;
    $window.localStorage.session_token = token;
    authService.init()
    .then(function(response) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      defer.resolve(response);
    })
    .catch(function(err) {
      if(!$rootScope.accessBlock) {
        $window.localStorage.removeItem('session_token');  
      }
      defer.reject(err);
    });
    return defer.promise;
  };

  authService.logout = function() {
    var defer = $q.defer();
    var url = ENV.APIURL + 'logout/';
    $http.post(url)
    .then(function(response){
      $window.localStorage.removeItem('session_token');
      $rootScope.accessBlock = null;
      $rootScope.currentUser = null;
      $rootScope.userPermissions = null;
      defer.resolve();
    })
    .catch(function(err){
      defer.reject(err);
    });
    return defer.promise;
  }

  authService.isAuthorized = function (actions) {
    // actions is an array of permissions (strings) to be tested against userPermissions
    if (actions === undefined || actions.length === 0) {
      return true;
    }
    if(!angular.isDefined($rootScope.userPermissions)) {
      return false;
    }
    var isAuthorized = true;
    angular.forEach(actions, function(action) {
      var filterSet = $filter('filter')($rootScope.userPermissions, function(permission){
        return permission.name === action && permission.is_set === true;
      });
      isAuthorized = (filterSet && filterSet.length > 0) && isAuthorized;
    });
    return isAuthorized;
  };

  return authService;
})

.factory('AuthStatus', function ($window, $rootScope) {
  var authStatus = {};

  authStatus.getToken = function () {
    return $window.localStorage.session_token;
  };

  authStatus.isAuthenticated = function () {
    return (!!$window.localStorage.session_token);
  };

  authStatus.hasLoaded = function() {
    if (authStatus.isAuthenticated()) {
      return angular.isDefined($rootScope.userPermissions);
    } else {
      return true;
    }
  };

  return authStatus;
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor', 'errorInterceptor');
})

.factory('tokenInterceptor', ['AuthStatus', '$window', function(AuthStatus, $window) {  
  return {
    request: function(config) {
      if (AuthStatus.isAuthenticated()) {
        config.headers['Authorization'] = 'token ' + AuthStatus.getToken();
      }
      return config;
    }
  }
}])

.factory('errorInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
      }[response.status], response);
      return $q.reject(response);
    }
  };
}])

.directive('formAutofillFix', ['$timeout', function ($timeout) {
  return function (scope, element, attrs) {
    element.prop('method', 'post');
    if (attrs.ngSubmit) {
      $timeout(function () {
        element
        .unbind('submit')
        .bind('submit', function (event) {
          event.preventDefault();
          element
          .find('input, textarea, select')
          .trigger('input')
          .trigger('change')
          .trigger('keydown');
          scope.$apply(attrs.ngSubmit);
        });
      });
    }
  };
}])
