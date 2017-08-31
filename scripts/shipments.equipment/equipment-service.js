"use strict";

angular.module('shippersPortalApp.shipments.equipment')
.factory('equipmentService', function ($http,$q,ENV) {

  var apis = {};
  apis.equipmentTagsOptions = function(){
    var defer = $q.defer();
    $http({method:'OPTIONS', url:ENV.APIURL+'equipmenttags/'}).then(function(response){
      defer.resolve(response);
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  apis.getEquipmentTags = function(shipment){
    var defer = $q.defer();
    $http.get(ENV.APIURL+'equipmenttags/?assignee_content_type=shipment&assignee_id='+shipment.id).then(function(response){
        // $http.get(ENV.APIURL+'equipmenttags/?assignee_content_type=shipment&assignee_id=381').then(function(response){
          defer.resolve(response);
        }, function(err){
          console.log(err);
          defer.reject(err);
        });
    return defer.promise;
  }

  apis.postEquipmentTag = function(data){
    var defer = $q.defer();
    $http({method:'POST', url:ENV.APIURL+'equipmenttags/', data:angular.toJson(data)}).then(function(response){
      defer.resolve(response);
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  apis.deleteEquipmentTag = function(equipmenttag){
    var defer = $q.defer();
    $http.delete(ENV.APIURL+'equipmenttags/'+equipmenttag.id+'/').then(function(response){
      defer.resolve(response);
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }
  
  return apis;
});
