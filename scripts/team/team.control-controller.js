"use strict";

angular.module('shippersPortalApp.team.control',[

  ])
.controller('teamControlController', function($scope, $state) {
  $scope.init = function() {

  }
  
  $scope.back = function() {
    $state.go('team')
  }
})