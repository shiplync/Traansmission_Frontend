"use strict";

angular.module('shippersPortalApp.team.userinvites.control',[])
.controller('userinvitesControlController', function($scope, $state, orderingLabels) {
  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }
})