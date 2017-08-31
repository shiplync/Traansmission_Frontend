'use strict';

/**
 * @ngdoc service
 * @name shippersPortalApp.users
 * @description
 * # User 
 * Factory in the shippersPortalApp.
 */
angular.module('shippersPortalApp')
  .factory('User', function (ENV, $q, $http) {
    
    var apis = {};

    apis.getSelf = function(){
      var defer = $q.defer();
      $http.get(ENV.APIURL+'users/self/').then(function(response){
        defer.resolve(response);
      }, function(err){
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    }
  
    apis.setSelf = function(data){
      var defer = $q.defer();
      $http({method:'PATCH', url:ENV.APIURL+'users/self/', data:angular.toJson(data)}).then(function(response){
          defer.resolve(response);
        }, function(err){
          console.log(err);
          defer.reject(err);
        });
      return defer.promise;
    }

    return apis;
  });
