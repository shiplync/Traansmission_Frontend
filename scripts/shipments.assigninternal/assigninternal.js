"use strict";

angular.module('shippersPortalApp.shipments.assigninternal', [
  'ui.router',
  'shippersPortalApp.shipments.assigninternal.control',
  'shippersPortalApp.team.users',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipment.assigninternal", {
    url: '/assigninternal?_id:_ordering:_page:_show_all_users',
    views: {
      "@shipment": {
        templateUrl: "scripts/shipments.assigninternal/assigninternal.html",
        controller: 'AssigninternalController'
      },
      "control@shipment": {
        templateUrl: "scripts/shipments.assigninternal/assigninternal.control.html",
        controller: 'AssigninternalController'
      }
    },
    data: {
      permissions: [P.viewShipmentAssignment],
    },
    resolve: {
      users: ['usersService', '$stateParams', 'shipmentId',
      function(usersService, $stateParams, shipmentId) {
        // Rename in order not to mess with existing parameters. 
        var params = {
          id: $stateParams._id,
          ordering: $stateParams._ordering,
          page: $stateParams._page,
          paginate_by: 25,
          show_shipment_access: shipmentId,
          show_shipment_assignment: shipmentId,
        }
        return usersService.getPaginatedUsers(params);
      }]
    }
  })
})