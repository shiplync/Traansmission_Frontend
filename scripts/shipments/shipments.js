"use strict";

angular.module('shippersPortalApp.shipments', [
  'ui.router',

  'shippersPortalApp.constants.permissions',
  
  'shippersPortalApp.shipments.control',
  'shippersPortalApp.shipments.list',
  'shippersPortalApp.shipments.detail',
  'shippersPortalApp.shipments.locations',
  'shippersPortalApp.shipments.equipment',
  'shippersPortalApp.shipments.settings',
  'shippersPortalApp.shipments.cost',
  'shippersPortalApp.shipments.trip',
  'shippersPortalApp.shipments.assigninternal',
  'shippersPortalApp.shipments.assignexternal',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("shipments", {
    url: "/shipments?:id:delivery_status:d_target:d_radius:d_query:d_latlon:ordering:page",
    parent: "freight",
    views: {
      "control@freight": {
        templateUrl: "scripts/shipments/shipments.control.html",
        controller: "controlController"
      },
      "content@index": { 
        templateUrl: "scripts/shipments/shipments.list.html",
        controller: "listController"
      }
    },
    data: {
      permissions: [P.viewShipment],
    },
    resolve: {
      shipments: ['shipmentsService', '$stateParams',
      function(shipmentsService, $stateParams) {
        return shipmentsService.getPaginatedShipments($stateParams);
      }],
      orderingLabels: function() {
        return {
          id: 'ID #',
          first_location__time_range__time_range_end: 'Pick up time',
          proximity: 'Proximity'
        }
      }
    }
  })
  .state("shipment", {
    // To access this state, ':shipment' must be set. 
    // If target shipment is not in the parent's resolved set, use ':id' to get target shipment. 
    abstract: true,
    parent: 'shipments',
    url: '/detail?:shipment', 
    views: {
      "detail": {
        template: '<div ng-if="shipment.id==shipmentId" ui-view="" autoscroll></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.shipmentId = $stateParams.shipment;
        }]
      },
      "control@freight": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    resolve: {
      shipmentId: ['$stateParams', function($stateParams) {
        return $stateParams.shipment;
      }]
    },
    data: {
      permissions: [],
    },
  })
})