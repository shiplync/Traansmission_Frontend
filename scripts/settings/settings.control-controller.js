"use strict";

angular.module('shippersPortalApp.settings.control',[

  ])
.controller('settingsControlController', function($scope, $state) {
  $scope.init = function() {

  }
  
  $scope.back = function() {
    $state.go('settings')
  }
})