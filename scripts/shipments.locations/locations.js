"use strict";

angular.module('shippersPortalApp.shipments.locations', [
  'ui.router',

  'shippersPortalApp.geoservices.distance',
  'shippersPortalApp.geoservices.cache',

  'shippersPortalApp.shipments.locations.load',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.location", {
    url: '/location?:location', 
    views: {
      "": {
        templateUrl: "scripts/shipments.locations/locations.html",
        controller: 'Locations'
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      locationId: ['$stateParams', function($stateParams) {
        return $stateParams.location;
      }]
    }
  })
  .state("shipment.location.edit", {
    url: '/edit', 
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.locations/locations.edit.html",
        controller: 'Locations'
      }
    },
    data: {
      permissions: [P.changeShipment],
    },
  })
})