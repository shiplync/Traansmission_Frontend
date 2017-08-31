"use strict";

angular.module('shippersPortalApp.shipments.settings')
.controller('ShipmentSettings', function($scope, $stateParams, $filter, $state, shipmentsService, $q) {

  $scope.init = function() {
    
  }

  $scope.deleteShipment = function(shipment) {
    var defer = $q.defer();
    shipmentsService.deleteShipment(shipment.id)
    .then(function(response) {
      $scope.shipment = null;
      $state.go('^.^', {id: ''}, {reload: true});
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
  
})