"use strict";

angular.module('shippersPortalApp.shipments.trip', [
  'ui.router',
  ])
.config(function ($stateProvider) {
  $stateProvider
  .state("shipment.trip", {
    url: '/trip', 
    views: {
      "": {
        templateUrl: "scripts/shipments.trip/trip.html",
        controller: 'Trip'
      }
    },
    data: {
      permissions: [],
    }
  })
})