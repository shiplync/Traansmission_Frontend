"use strict";

angular.module('shippersPortalApp.team.divisions.control',[])
.controller('divisionsControlController', function($scope, $state, $stateParams, $q, divisionsService, P, orderingLabels) {
  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }
})