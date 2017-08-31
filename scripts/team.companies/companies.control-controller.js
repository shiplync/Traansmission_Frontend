"use strict";

angular.module('shippersPortalApp.team.companies.control',[])
.controller('companiesControlController', function($scope, $state, $stateParams, $q, companiesService, P, orderingLabels) {
  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }
})