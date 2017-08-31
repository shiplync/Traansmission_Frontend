"use strict";

angular.module('shippersPortalApp.shipments.assignexternal')
.factory('assignexternalService', function (baseService) {

  var apis = {}

  var assignment_conf = {
    path: 'shipmentassignments/',
    track: 'customer shipment assignment'
  }
  var carrier_assignment_conf = {
    path: 'carrierassignments/',
    track: 'carrier shipment assignment' 
  }

  apis.postShipmentAssignment = function(data) {return baseService.postObject(assignment_conf, data)};
  apis.deleteShipmentAssignment = function(obj_id) {return baseService.deleteObject(assignment_conf, obj_id)};

  apis.postShipmentCarrierAssignment = function(data) {return baseService.postObject(carrier_assignment_conf, data)};
  apis.deleteShipmentCarrierAssignment = function(obj_id) {return baseService.deleteObject(carrier_assignment_conf, obj_id)};

  return apis;
});
