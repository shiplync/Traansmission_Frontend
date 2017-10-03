"use strict";

angular.module('shippersPortalApp.shipments')
.factory('shipmentsService', function (baseService) {

  var apis = {};

  var shipment_conf = {
    path: 'shipments/',
    track: 'shipment'
  }
  var msg_conf = {
    path: 'message/',
  
  }


  var location_conf = {
    path: 'locations/',
    track: 'location'
  }

  apis.getShipment = function(shipment_id) {return baseService.getObject(shipment_conf, shipment_id)};
  apis.getPaginatedShipments = function(params){return baseService.getPaginatedObjects(shipment_conf, params)};
  apis.postShipment = function(data){return baseService.postObject(shipment_conf, data)};
  apis.getMessage = function(data){return baseService.postObject(msg_conf, data)};
  apis.patchShipment = function(data, shipment_id){return baseService.patchObject(shipment_conf, data, shipment_id)};
  apis.deleteShipment = function(shipment_id){return baseService.deleteObject(shipment_conf, shipment_id)};

  apis.postLocation = function(data){return baseService.postObject(location_conf, data)};
  apis.patchLocation = function(data, location_id){return baseService.patchObject(location_conf, data, location_id)};
  apis.deleteLocation = function(location_id){return baseService.deleteObject(location_conf, location_id)};

  return apis;
});
