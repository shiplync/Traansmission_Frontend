"use strict";

angular.module('shippersPortalApp.shipments.detail',[

  ])
.controller('detailController', function($scope, locations, shipmentsService, $stateParams, $state, $q){
  $scope.init = function() {

  }

  $scope.highlightState = function(state, params) {
    return $state.includes(state, params) ? 'highlight' : '';
  }

  $scope.addLocation = function() {
    // Typically called in 'shipments' state
    var defer = $q.defer();
    var data  = {
      shipment: $scope.shipment.id,
      location_type: 3
    }
    locations.postLocation(data)
    .then(function(response){
      return shipmentsService.getShipment($scope.shipment.id);
    })
    .then(function(response) {
      $scope.shipment = response.data;
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeLocation = function(location) {
    // Typically called in 'shipments.location.edit' state
    var defer = $q.defer();
    locations.deleteLocation(location.id)
    .then(function(response){
      return shipmentsService.getShipment($scope.shipment.id);
    })
    .then(function(response) {
      $scope.shipment = response.data;
      $state.go("^.^.^");
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

})