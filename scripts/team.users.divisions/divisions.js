"use strict";

angular.module('shippersPortalApp.team.users.divisions', [
  'ui.router',
  'shippersPortalApp.team.users.divisions.control',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("user.divisions", {
    url: '/divisions?_id:_ordering:_page',
    views: {
      "@user": {
        templateUrl: "scripts/team.users.divisions/divisions.html",
        controller: 'DivisionsController'
      },
      "control@user": {
        templateUrl: "scripts/team.users.divisions/divisions.control.html",
        controller: 'DivisionsController'
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      divisions: ['divisionsService', '$stateParams', 'userId',
      function(divisionsService, $stateParams, userId) {
        // Rename in order not to mess with existing parameters. 
        var params = {
          id: $stateParams._id,
          ordering: $stateParams._ordering,
          page: $stateParams._page,
          paginate_by: 25,
          show_user_membership: userId,
        }
        return divisionsService.getPaginatedDivisions(params);
      }]
    }
  })
})