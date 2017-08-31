"use strict";

angular.module('shippersPortalApp.team.userinvites', [
  'ui.router',
  
  'shippersPortalApp.constants.permissions',

  'shippersPortalApp.team.userinvites.control',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("userinvites", {
    url: "/userinvites?:id:ordering:page",
    parent: "team",
    views: {
      "control@team": {
        templateUrl: "scripts/team.userinvites/userinvites.control.html",
        controller: "userinvitesControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team.userinvites/userinvites.list.html",
        controller: "userinvitesListController"
      }
    },
    data: {
      permissions: [P.viewUserInvite],
      navLabel: 'Team'
    },
    resolve: {
      userinvites: ['userinvitesService', '$stateParams',
      function(userinvitesService, $stateParams) {
        return userinvitesService.getPaginatedUserinvites($stateParams);
      }],
      orderingLabels: function() {
        return {
          first_name: 'First name'
        }
      }
    }
  })
  .state("userinvite", {
    // To access this state, ':userinvite' must be set. 
    // If target userinvite is not in the parent's resolved set, use ':id' to get target userinvite. 
    abstract: true,
    parent: 'userinvites',
    url: '/detail?:userinvite', 
    views: {
      "detail": {
        template: '<div ng-if="userinvite.id==userinviteId" ui-view=""></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.userinviteId = $stateParams.userinvite;
        }]
      },
      "control@team": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    data: {
      permissions: [],
    },
  })
})