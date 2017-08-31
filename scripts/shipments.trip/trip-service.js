"use strict";

angular.module('shippersPortalApp.shipments.trip')
.factory('tripService', function ($http,$q,ENV) {
  var apis = {};

  apis.getByShipment = function(id){
    var defer = $q.defer();
    $http.get(ENV.APIURL+'shipments/'+id+'/geolocations/').then(function(response){
     defer.resolve(response); 
   }, function(err){
    defer.reject(err);
  });
    return defer.promise;
  }
  
  return apis;
});
