"use strict";

angular.module('shippersPortalApp.temlocations.control',[])
.controller('temlocationsControlController', function($scope, $state, $stateParams, $q, temlocationsService, orderingLabels) {
  $scope.init = function() {
    $scope.params = $stateParams;
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }

})