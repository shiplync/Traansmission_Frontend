"use strict";

angular.module('shippersPortalApp.authentication.login',[

  ])
.controller('loginController', function($scope, $state, AuthService, $rootScope, $q){
  $scope.init = function() {
    $scope.credentials = {
      username: '',
      password: ''
    };
  }

  $scope.login = function (credentials) {
	  console.log("signing in");
     var defer = $q.defer();
   $scope.loginError = '';
    if (!credentials.username || !credentials.password) {
      $scope.loginError = "You must supply email and password";
      defer.reject();
      return defer.promise;
    }
    AuthService.login(credentials)
    .then(function(response) {
		console.log("response:");
		console.log(response);
      $state.go('home');
	//$state.go('shipments');
    })
    .catch(function (err) {
		console.log(err);
      if(err.status==401) {
        $scope.loginError = "Wrong email or password";
      }
      defer.reject();
    });
    return defer.promise;
  };

})
