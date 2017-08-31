'use strict';

/**
 * @ngdoc function
 * @name shippersPortalApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the shippersPortalApp
 */
angular.module('shippersPortalApp')
  .controller('NavbarCtrl', function ($scope, $location, $window, AuthService, $state, AuthStatus, analytics) {
    $scope.isAuthenticated = AuthStatus.isAuthenticated;

    $scope.userLogout = function() {
      AuthService.logout()
      .then(function() {
        analytics.track('logout', {});
        $state.go('login');
      });
    };

    $scope.settingsState = $state.get('settings');
    $scope.navStates = [
      {
        parentState: $state.get('freight'),
        gotoState: $state.get('shipments')
      },
      {
        parentState: $state.get('team'),
        gotoState: $state.get('users')
      }
    ];

    $scope.showState = function(state) {
      if(AuthStatus.isAuthenticated()) {
        if(AuthService.isAuthorized(state.data.permissions)) {
          return true;
        } else {
          return false;
        }
      } else {
        if(state.data.noAuthenticate === true) {
          return true;
        } else {
          return false;
        }
      }
    };

    $scope.highlightNavState = function(state, params) {
      return $state.includes(state, params) ? 'active' : '';
    }
  });
