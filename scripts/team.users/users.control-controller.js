"use strict";

angular.module('shippersPortalApp.team.users.control',[])
.controller('usersControlController', function($scope, $state, $stateParams, $q, usersService, P, orderingLabels) {
  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }
})