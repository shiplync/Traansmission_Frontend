"use strict";

angular.module('shippersPortalApp.freight', [
  'ui.router',

  'shippersPortalApp.constants.permissions',
  
  'shippersPortalApp.freight.control',
  'shippersPortalApp.shipments',
  'shippersPortalApp.temlocations',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("freight", {
    url: "",
    parent: "index",
    abstract: true,
    views: {
      "control@index": {
        templateUrl: "scripts/freight/freight.control.html",
        controller: "freightControlController"
      },
      "content@index": { 
        template: '<div ui-view=""></div>',
      }
    },
    data: {
      permissions: [],
      navLabel: 'Freight'
    }
  })
})