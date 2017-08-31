"use strict";

angular.module('shippersPortalApp.team.users', [
  'ui.router',
  
  'shippersPortalApp.constants.permissions',

  'shippersPortalApp.team.users.control',
  'shippersPortalApp.team.users.settings',
  'shippersPortalApp.team.users.divisions',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("users", {
    url: "?:id:ordering:page",
    parent: "team",
    views: {
      "control@team": {
        templateUrl: "scripts/team.users/users.control.html",
        controller: "usersControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team.users/users.list.html",
        controller: "usersListController"
      }
    },
    data: {
      permissions: [P.viewGenericUser]
    },
    resolve: {
      users: ['usersService', '$stateParams',
      function(usersService, $stateParams) {
        var params = $stateParams;
        params['show_profile_photo'] = true;
        return usersService.getPaginatedUsers(params);
      }],
      orderingLabels: function() {
        return {
          first_name: 'First name',
          last_name: 'Last name'
        }
      }
    }
  })
  .state("user", {
    // To access this state, ':user' must be set. 
    // If target user is not in the parent's resolved set, use ':id' to get target user. 
    abstract: true,
    parent: 'users',
    url: '/detail?:user', 
    views: {
      "detail": {
        template: '<div ng-if="user.id==userId"><div ui-view="" autoscroll></div></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.userId = $stateParams.user;
        }]
      },
      "control@team": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    resolve: {
      userId: ['$stateParams', function($stateParams) {
        return $stateParams.user;
      }]
    },
    data: {
      permissions: [],
    },
  })
})