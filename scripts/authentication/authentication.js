"use strict";

angular.module('shippersPortalApp.authentication', [
  'ui.router',

  'shippersPortalApp.authentication.login',
  'shippersPortalApp.authentication.registeruser',
  'shippersPortalApp.authentication.resetpassword',
  'shippersPortalApp.authentication.register',
  ])
.config(function ($stateProvider) {
  $stateProvider
  .state('authentication', {
    url: "",
    abstract: true,
    templateUrl: "scripts/authentication/authentication.html",
  })
  .state("login", {
    url: "/login",
    parent: 'authentication',
    templateUrl: "scripts/authentication/authentication.login.html",
    controller: 'loginController',
    data: {
      noAuthenticate: true
    }
  })
  .state("registeruser", {
    url: "/register/user?t",
    parent: 'authentication',
    templateUrl: "scripts/authentication/authentication.registeruser.html",
    controller: 'registerUserInviteController',
    data: {
      noAuthenticate: true
    }
  })
  .state("unverified", {
    url: "/unverified",
    parent: 'authentication',
    templateUrl: "scripts/authentication/authentication.unverified.html",
    data: {
      accessBlockState: true,
    }
  })
  .state("trialexpired", {
    url: "/trialexpired",
    parent: 'authentication',
    templateUrl: "scripts/authentication/authentication.trialexpired.html",
    data: {
      accessBlockState: true,
    }
  })
  .state("resetpassword", {
    url: "/resetpassword",
    parent: 'authentication',
    templateUrl: "scripts/authentication/authentication.resetpassword.html",
    controller: 'resetPasswordController',
    data: {
      noAuthenticate: true
    }
  })
})
