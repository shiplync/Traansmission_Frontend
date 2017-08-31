"use strict";

angular.module('shippersPortalApp.team.users.settings', [
  'ui.router',
  'shippersPortalApp.team.users.settings.control',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("user.settings", {
    url: '/settings', 
    views: {
      "": {
        templateUrl: "scripts/team.users.settings/settings.html",
        controller: 'UserSettings'
      }
    },
    data: {
      permissions: [P.changeGenericUser],
    }
  })
})