"use strict";

angular.module('shippersPortalApp.temlocations')
.factory('temlocationsService', function (baseService) {

  var apis = {}

  var conf = {
    path: 'templatelocations/',
    track: 'template location'
  }

  apis.getLocation = function(location_id){return baseService.getObject(conf, location_id)};
  apis.getPaginatedLocations = function(params){return baseService.getPaginatedObjects(conf, params)};
  apis.postLocation = function(data){return baseService.postObject(conf, data)};
  apis.patchLocation = function(data, location_id){return baseService.patchObject(conf, data, location_id)};
  apis.deleteLocation = function(location_id){return baseService.deleteObject(conf, location_id)};

  return apis;
});
