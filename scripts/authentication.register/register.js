"use strict";

angular.module('shippersPortalApp.authentication.register', [
  'ui.router',

  'shippersPortalApp.authentication.register.user.control',
  'shippersPortalApp.authentication.register.company.control',
  'shippersPortalApp.authentication.register.subscription.control',
  'shippersPortalApp.constants.companytype',
	'ui.bootstrap-slider',
  ])
.config(function ($stateProvider) {
  $stateProvider
  .state("register", {
    url: "?:users:drivers:plantype",
    templateUrl: "scripts/authentication.register/register.html",
    abstract: true,
    parent: 'authentication',
    data: {
      noAuthenticate: true
    }
  })
  .state("register.start", {
    url: "/register",
    templateUrl: "scripts/authentication.register/register.user.html",
    controller: 'registerUserController',
  })
  // .state("register.subscription", {
  //   url: "/register/subscription",
  //   templateUrl: "scripts/authentication.register/register.subscription.html",
  //   controller: 'registerSubscriptionController',
  //   data: {
  //     accessBlockState: true,
  //   },
  //   resolve: {
  //     activeSubscription: ['registerService',
  //     function(registerService) {
  //       return registerService.getSubscription();
  //     }],
  //   }
  // })
  .state("register.company", {
    url: "/register/company",
    templateUrl: "scripts/authentication.register/register.company.html",
    controller: 'registerCompanyController',
    data: {
      accessBlockState: true,
    },
    resolve: {
      activeCompany: ['registerService',
      function(registerService) {
        return registerService.getCompany();
      }],
    }
  })
})
