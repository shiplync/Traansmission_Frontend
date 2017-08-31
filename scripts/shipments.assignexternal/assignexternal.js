"use strict";

angular.module('shippersPortalApp.shipments.assignexternal', [
  'ui.router',
  'shippersPortalApp.shipments.assignexternal.control',
  'shippersPortalApp.team.companies',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.assignexternal", {
    url: '/assignexternal?_id:_ordering:_page',
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.assignexternal/assignexternal.html",
        controller: 'AssignexternalController'
      },
      "control@shipment": {
        templateUrl: "scripts/shipments.assignexternal/assignexternal.control.html",
        controller: 'AssignexternalController'
      }
    },
    data: {
      permissions: [P.viewShipmentAssignment],
    },
    resolve: {
      companies: ['companiesService', '$stateParams', 'shipmentId',
      function(companiesService, $stateParams, shipmentId) {
        // Rename in order not to mess with existing parameters. 
        var params = {
          id: $stateParams._id,
          ordering: $stateParams._ordering,
          page: $stateParams._page,
          paginate_by: 25,
          show_shipment_access: shipmentId,
          show_shipment_assignment: shipmentId,
        }
        return companiesService.getPaginatedCompanies(params);
      }]
    }
  })
})