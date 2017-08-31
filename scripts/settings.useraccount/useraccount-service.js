"use strict";

angular.module('shippersPortalApp.settings.useraccount')
.factory('userService', function ($http,$q,ENV, baseService) {

  var apis = {};

  var conf = {
    path: 'users/self/',
    track: 'user'
  }

  apis.updateUser = function(data) {return baseService.patchObject(conf, data)};
  apis.getUser = function() {return baseService.getObject(conf)};

  apis.updatePassword = function (oldPassword, newPassword){
    var deferred = $q.defer();
    var url = ENV.APIURL + 'users/change_password/';
    $http.post(url, {'old_password':oldPassword, 'new_password': newPassword}).then(function(data){
      deferred.resolve(data);
    }, function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  
  return apis;
});
