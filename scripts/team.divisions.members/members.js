"use strict";

angular.module('shippersPortalApp.team.divisions.members', [
  'ui.router',
  'shippersPortalApp.team.divisions.members.control',
  'shippersPortalApp.team.users',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("division.members", {
    url: '/members?_id:_ordering:_page:_show_all_users',
    views: {
      "@division": {
        templateUrl: "scripts/team.divisions.members/members.html",
        controller: 'DivisionMembersController'
      },
      "control@division": {
        templateUrl: "scripts/team.divisions.members/members.control.html",
        controller: 'DivisionMembersController'
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      users: ['usersService', '$stateParams', 'divisionId',
      function(usersService, $stateParams, divisionId) {
        // Rename in order not to mess with existing parameters. 
        var params = {
          id: $stateParams._id,
          ordering: $stateParams._ordering,
          page: $stateParams._page,
          paginate_by: 25,
          return_self: true,
          show_division_membership: divisionId,
          companydivision: ($stateParams._show_all_users ? null : divisionId)
        }
        return usersService.getPaginatedUsers(params);
      }]
    }
  })
})