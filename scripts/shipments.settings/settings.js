"use strict";

angular.module('shippersPortalApp.shipments.settings', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.settings", {
    url: '/settings', 
    views: {
      "": {
        templateUrl: "scripts/shipments.settings/settings.html",
        controller: 'ShipmentSettings'
      }
    },
    data: {
      permissions: [P.changeShipment],
    }
  })
})