"use strict";

angular.module('shippersPortalApp.shipments.assigninternal')
.factory('assigninternalService', function (baseService) {

  var apis = {}

  var assignment_conf = {
    path: 'shipmentassignments/',
    track: 'internal shipment assignment'
  }
  var driver_assignment_conf = {
    path: 'driverassignments/',
    track: 'driver shipment assignment'
  }

  apis.postShipmentAssignment = function(data) {return baseService.postObject(assignment_conf, data)};
  apis.deleteShipmentAssignment = function(obj_id) {return baseService.deleteObject(assignment_conf, obj_id)};

  apis.postShipmentDriverAssignment = function(data) {return baseService.postObject(driver_assignment_conf, data)};
  apis.deleteShipmentDriverAssignment = function(obj_id) {return baseService.deleteObject(driver_assignment_conf, obj_id)};

  return apis;
});
