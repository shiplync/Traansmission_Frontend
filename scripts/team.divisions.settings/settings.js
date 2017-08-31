"use strict";

angular.module('shippersPortalApp.team.divisions.settings', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("division.settings", {
    url: '/settings', 
    views: {
      "": {
        templateUrl: "scripts/team.divisions.settings/settings.html",
        controller: 'Settings'
      }
    },
    data: {
      permissions: [P.changeCompanyDivision],
    }
  })
})