"use strict";

angular.module('shippersPortalApp.shipments.cost')
.factory('costService', function (baseService) {

  var apis = {};

  var conf = {
    path: 'shipments/',
    track: 'shipment cost'
  }

  apis.patchCost = function(shipment_id, data){return baseService.patchObject(conf, {payout_info: {payout: data.payout}}, shipment_id)};

  return apis;
});
