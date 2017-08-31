"use strict";

angular.module('shippersPortalApp.shipments.equipment', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.equipment", {
    url: '/equipment', 
    views: {
      "": {
        templateUrl: "scripts/shipments.equipment/equipment.html",
        controller: 'Equipment'
      }
    },
    data: {
      permissions: [],
    }
  })
  .state("shipment.equipment.edit", {
    url: '/edit', 
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.equipment/equipment.edit.html",
        controller: 'Equipment'
      }
    },
    data: {
      permissions: [P.changeShipment],
    },
  })
})