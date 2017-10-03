"use strict";

/**
 * @ngdoc overview
 * @name shippersPortalApp
 * @description
 * # shippersPortalApp
 *
 * Main module of the application.
 */
var __env = getConfig();
angular.module('config', []).constant('ENV', __env);
angular
  .module('shippersPortalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.slider', // sliders for allshipments sidebar
    'ngFx', // animations
    'ngStorage',
    'mgcrea.ngStrap', // twitter bootstrap module
    'config', // angular config (e.g. ENV.API)
    'angularModalService', // TOS modal
    'angularFileUpload', // file/prof pic upload module
    'ngMap', // gmaps module
    'ui.router',
    'angularUtils.directives.dirPagination',

    'shippersPortalApp.constants.permissions',
    'shippersPortalApp.constants.usertype',
    'shippersPortalApp.constants.companytype',
    'shippersPortalApp.constants.accessblocktype',
    'shippersPortalApp.freight',
    'shippersPortalApp.shipments',
    'shippersPortalApp.settings',
    'shippersPortalApp.authentication',
    'shippersPortalApp.shared.conversion',
    'shippersPortalApp.temlocations',
    'shippersPortalApp.team',
    //'shippersPortalApp.main',
  ])
  .config(['$timepickerProvider', '$stateProvider', '$urlRouterProvider', 'P', '$compileProvider', '$provide', function ($timepickerProvider, $stateProvider, $urlRouterProvider, P, $compileProvider, $provide) {
    // Performance improvement
    $compileProvider.debugInfoEnabled(false);

    // configure shipment create and update timepicker
    angular.extend($timepickerProvider.defaults, {
      minuteStep: 15,
      minTime: 'now'
    });

    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
            $('html,body').animate({
                scrollTop: uiViewElement.offset().top - 30
            }, 400);
        };
    });

    $stateProvider
    .state("index", {
      abstract: true,
      views: {
        "@": { templateUrl: "scripts/layout/tpl.dashboard.html" },
        "layout.content@index": { templateUrl: "scripts/layout/tpl.content.html" },
        "layout.control@index": { templateUrl: "scripts/layout/tpl.control.html" },
      },
      controller: ['$scope',
      function($scope) {

      }],
      data: {
        permissions: [],
      },
    })
   .state("home", {
      url: "/",
      data: {
        permissions: [P.viewShipment],
        redirectTo: 'shipments'
      },
    })
	.state("payment", {
		url: "/reg-pay",
		data:{
			permissions: [],
		},
	});
	$urlRouterProvider.otherwise("/shipments");
  }])

