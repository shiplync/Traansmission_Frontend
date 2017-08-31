"use strict";

angular.module('shippersPortalApp.settings', [
  'ui.router',

  'shippersPortalApp.constants.permissions',
  
  'shippersPortalApp.settings.control',
  'shippersPortalApp.settings.useraccount',
  'shippersPortalApp.settings.companyaccount',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("settings", {
    url: "/settings",
    parent: "index",
    abstract: true,
    views: {
      "control@index": {
        templateUrl: "scripts/settings/settings.control.html",
        controller: "settingsControlController"
      },
      "content@index": { 
        templateUrl: "scripts/settings/settings.html",
      }
    },
    data: {
      permissions: []
    }
  })
})