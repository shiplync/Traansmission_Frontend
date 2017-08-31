"use strict";

angular.module('shippersPortalApp.shipments.cost')
.controller('Cost', function($scope, $stateParams, $filter, $state, costService, $q) {

  $scope.init = function() {
    $scope.cost = angular.copy($scope.$parent.shipment.payout_info.payout)
  }

  $scope.updateCost = function(shipmentId, cost) {
    var defer = $q.defer();
    costService.patchCost(shipmentId, {payout: cost})
    .then(function(response) {
      $scope.$parent.shipment.payout_info.payout = response.data.payout_info.payout;
      $state.go("^.^.^");
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }
  
})