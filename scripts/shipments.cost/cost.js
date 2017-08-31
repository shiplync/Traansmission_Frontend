"use strict";

angular.module('shippersPortalApp.shipments.cost', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.cost", {
    url: '/cost', 
    views: {
      "": {
        templateUrl: "scripts/shipments.cost/cost.html",
        controller: 'Cost'
      }
    },
    data: {
      permissions: [],
    }
  })
  .state("shipment.cost.edit", {
    url: '/edit', 
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.cost/cost.edit.html",
        controller: 'Cost'
      }
    },
    data: {
      permissions: [P.changeShipment],
    },
  })
})