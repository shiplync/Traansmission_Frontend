"use strict";

angular.module('shippersPortalApp.shipments.locations.load', [
  'ui.router',
  'shippersPortalApp.temlocations.control',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.location.load", {
    url: '/load?_id:_ordering:_page',
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.locations.load/load.html",
        controller: 'LocationsLoadController'
      },
      "control@shipment": {
        templateUrl: "scripts/shipments.locations.load/load.control.html",
        controller: 'LocationsLoadController'
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      locations: ['temlocationsService', '$stateParams',
      function(temlocationsService, $stateParams) {
        // Rename in order not to mess with existing parameters. 
        var params = {
          id: $stateParams._id,
          ordering: $stateParams._ordering,
          page: $stateParams._page,
          paginate_by: 25,
        }
        return temlocationsService.getPaginatedLocations(params);
      }],
      orderingLabels: function() {
        return {
          updated_at: 'Recently used',
          id: 'ID #',
          company_name: 'Company name',
          address_details__city: 'City',
        }
      }
    }
  })
})