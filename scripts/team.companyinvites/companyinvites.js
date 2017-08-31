"use strict";

angular.module('shippersPortalApp.team.companyinvites', [
  'ui.router',
  
  'shippersPortalApp.constants.permissions',

  'shippersPortalApp.team.companyinvites.control',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("companyinvites", {
    url: "/companyinvites?:id:ordering:page",
    parent: "team",
    views: {
      "control@team": {
        templateUrl: "scripts/team.companyinvites/companyinvites.control.html",
        controller: "companyinvitesControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team.companyinvites/companyinvites.list.html",
        controller: "companyinvitesListController"
      }
    },
    data: {
      permissions: [P.viewCompanyInvite],
      navLabel: 'Team'
    },
    resolve: {
      companyinvites: ['companyinvitesService', '$stateParams',
      function(companyinvitesService, $stateParams) {
        return companyinvitesService.getPaginatedCompanyinvites($stateParams);
      }],
      orderingLabels: function() {
        return {
          invitee_name: 'Company name'
        }
      }
    }
  })
  .state("companyinvite", {
    // To access this state, ':companyinvite' must be set. 
    // If target companyinvite is not in the parent's resolved set, use ':id' to get target companyinvite. 
    abstract: true,
    parent: 'companyinvites',
    url: '/detail?:companyinvite', 
    views: {
      "detail": {
        template: '<div ng-if="companyinvite.id==companyinviteId" ui-view=""></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.companyinviteId = $stateParams.companyinvite;
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