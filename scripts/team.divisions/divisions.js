"use strict";

angular.module('shippersPortalApp.team.divisions', [
  'ui.router',
  
  'shippersPortalApp.constants.permissions',

  'shippersPortalApp.team.divisions.control',
  'shippersPortalApp.team.divisions.settings',
  'shippersPortalApp.team.divisions.members',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("divisions", {
    url: "/divisions?:id:ordering:page",
    parent: "team",
    views: {
      "control@team": {
        templateUrl: "scripts/team.divisions/divisions.control.html",
        controller: "divisionsControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team.divisions/divisions.list.html",
        controller: "divisionsListController"
      }
    },
    data: {
      permissions: [P.viewCompanyDivision],
    },
    resolve: {
      divisions: ['divisionsService', '$stateParams',
      function(divisionsService, $stateParams) {
        return divisionsService.getPaginatedDivisions($stateParams);
      }],
      orderingLabels: function() {
        return {
          name: 'Name'
        }
      }
    }
  })
  .state("division", {
    // To access this state, ':division' must be set. 
    // If target division is not in the parent's resolved set, use ':id' to get target division. 
    abstract: true,
    parent: 'divisions',
    url: '/detail?:division', 
    views: {
      "detail": {
        template: '<div ng-if="division.id==divisionId" ui-view="" autoscroll></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.divisionId = $stateParams.division;
        }]
      },
      "control@team": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    resolve: {
      divisionId: ['$stateParams', function($stateParams) {
        return $stateParams.division;
      }]
    },
    data: {
      permissions: [],
    },
  })
})