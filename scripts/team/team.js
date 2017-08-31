"use strict";

angular.module('shippersPortalApp.team', [
  'ui.router',

  'shippersPortalApp.constants.permissions',
  
  'shippersPortalApp.team.control',
  'shippersPortalApp.team.users',
  'shippersPortalApp.team.companies',
  'shippersPortalApp.team.divisions',
  'shippersPortalApp.team.userinvites',
  'shippersPortalApp.team.companyinvites',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("team", {
    url: "/team",
    parent: "index",
    abstract: true,
    views: {
      "control@index": {
        templateUrl: "scripts/team/team.control.html",
        controller: "teamControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team/team.html",
      }
    },
    data: {
      permissions: [],
      navLabel: 'Team'
    }
  })
})