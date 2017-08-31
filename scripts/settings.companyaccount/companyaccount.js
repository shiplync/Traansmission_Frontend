"use strict";

angular.module('shippersPortalApp.settings.companyaccount', [
  'ui.router',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("companyaccount", {
    parent: "settings",
    url: "/company",
    views: {
      "": {
        templateUrl: "scripts/settings.companyaccount/companyaccount.html",
        controller: 'Company'
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
  .state("companyaccount.edit", {
    abstract: true,
    url: "/edit", 
    views: {
      "@settings": {
        templateUrl: "scripts/settings.companyaccount/companyaccount.edit.html",
        controller: 'Company'
      }
    },
    data: {
      permissions: [],
    },
  })
  .state("companyaccount.edit.basic", {
    url: "", 
    views: {
      "": {
        templateUrl: "scripts/settings.companyaccount/companyaccount.edit.basic.html",
        controller: 'Company'
      }
    },
    data: {
      permissions: [],
    },
  })
  .state("companyaccount.edit.logo", {
    url: "/logo", 
    views: {
      "": {
        templateUrl: "scripts/settings.companyaccount/companyaccount.edit.logo.html",
        controller: 'Company'
      }
    },
    data: {
      permissions: [],
    },
  })
})