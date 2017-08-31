"use strict";

angular.module('shippersPortalApp.shipments.locations')
.factory('locations', function (baseService) {

  var apis = {};

  var location_conf = {
    path: 'locations/',
    track: 'location'
  }

  apis.postLocation = function(data){return baseService.postObject(location_conf, data)};
  apis.patchLocation = function(data, location_id){return baseService.patchObject(location_conf, data, location_id)};
  apis.deleteLocation = function(location_id){return baseService.deleteObject(location_conf, location_id)};

  return apis;
});
