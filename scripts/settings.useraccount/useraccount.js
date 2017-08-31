"use strict";

angular.module('shippersPortalApp.settings.useraccount', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("useraccount", {
    parent: "settings",
    url: "", // Default settings state
    views: {
      "": {
        templateUrl: "scripts/settings.useraccount/useraccount.html",
        controller: 'User'
      }
    },
    data: {
      permissions: [],
    },
    resolve: {
      locationId: ['$stateParams', function($stateParams) {
        return $stateParams.location;
      }]
    }
  })
  .state("useraccount.edit", {
    abstract: true,
    url: "/user/edit", 
    views: {
      "@settings": {
        templateUrl: "scripts/settings.useraccount/useraccount.edit.html",
        controller: 'User'
      }
    },
    data: {
      permissions: [],
    },
  })
  .state("useraccount.edit.basic", {
    url: "", 
    views: {
      "": {
        templateUrl: "scripts/settings.useraccount/useraccount.edit.basic.html",
        controller: 'User'
      }
    },
    data: {
      permissions: [],
    },
  })
  .state("useraccount.edit.password", {
    url: "/password", 
    views: {
      "": {
        templateUrl: "scripts/settings.useraccount/useraccount.edit.password.html",
        controller: 'User'
      }
    },
    data: {
      permissions: [],
    },
  })
  .state("useraccount.edit.photo", {
    url: "/photo", 
    views: {
      "": {
        templateUrl: "scripts/settings.useraccount/useraccount.edit.photo.html",
        controller: 'User'
      }
    },
    data: {
      permissions: [],
    },
  })
})