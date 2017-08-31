"use strict";

angular.module('shippersPortalApp.temlocations', [
  'ui.router',

  'shippersPortalApp.constants.permissions',
  
  'shippersPortalApp.temlocations.control',
  // 'shippersPortalApp.shipments.list',
  // 'shippersPortalApp.shipments.detail',
  // 'shippersPortalApp.shipments.locations',
  // 'shippersPortalApp.shipments.equipment',
  // 'shippersPortalApp.shipments.assignments',
  // 'shippersPortalApp.shipments.requests',
  // 'shippersPortalApp.shipments.settings',
  // 'shippersPortalApp.shipments.cost',
  // 'shippersPortalApp.shipments.activecarrier',
  // 'shippersPortalApp.shipments.trip',
  // 'shippersPortalApp.shipments.outrequests',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("temlocations", {
    url: "/templates/locations?:id:ordering:page",
    parent: "freight",
    views: {
      "control@freight": {
        templateUrl: "scripts/temlocations/temlocations.control.html",
        controller: "temlocationsControlController"
      },
      "content@index": { 
        templateUrl: "scripts/temlocations/temlocations.list.html",
        controller: "temlocationsListController"
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      locations: ['temlocationsService', '$stateParams',
      function(temlocationsService, $stateParams) {
        return temlocationsService.getPaginatedLocations($stateParams);
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
  .state("temlocation", {
    // To access this state, ':location' must be set. 
    // If target location is not in the parent's resolved set, use ':id' to get target location. 
    abstract: true,
    parent: 'temlocations',
    url: '/detail?:location', 
    views: {
      "detail": {
        template: '<div ng-if="location.id==locationId" ui-view="" autoscroll></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.locationId = $stateParams.location;
        }]
      },
      "control@freight": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    data: {
      permissions: [],
    },
  })
  .state("temlocation.edit", {
    url: '/edit', 
    views: {
      "": {
        templateUrl: "scripts/temlocations/temlocations.detail.edit.html",
        controller: 'temlocationsDetailController'
      }
    },
    data: {
      permissions: [],
    },
  })
})