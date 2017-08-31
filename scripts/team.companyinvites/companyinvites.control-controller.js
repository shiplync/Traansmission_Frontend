"use strict";

angular.module('shippersPortalApp.team.companyinvites.control',[])
.controller('companyinvitesControlController', function($scope, $state, orderingLabels) {
  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;
  }
})