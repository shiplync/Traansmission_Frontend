"use strict";

angular.module('shippersPortalApp')
.factory('permissions', function ($http, $q, ENV) {
  return {
    getUserPermissions: function(){
      var defer = $q.defer();
      $http.get(ENV.APIURL+'permissions/')
      .then(function(response){
        defer.resolve(response.data.permissions);
      }, function(err){
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    }
  }

});
