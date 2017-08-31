angular.module('shippersPortalApp.authentication')
.factory('authenticationService', function ($http, $q, ENV, analytics) {

  var apis = {};

  apis.resetPassword = function (email) {
    // mixpanel.identify(email);
    var deferred = $q.defer();
    var url = ENV.APIURL + 'users/reset_password/';
    $http.post(url, {'email':email}).then(
      function(data){
          analytics.track('reset password', {});
          deferred.resolve(data);
        },
        function(err){
          deferred.reject(err);
        });
    return deferred.promise;
  };

  apis.getUserinvite = function (token) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL + 'userinvites/accept/' + token + '/',
      method: 'GET'
    })
    .then(function(response){
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.patchUserinvite = function (token, data) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL + 'userinvites/accept/' + token + '/',
      method: 'PATCH',
      data: angular.toJson(data)
    })
    .then(function(response){
      analytics.track('accept user invitation', {});
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  return apis;
});
