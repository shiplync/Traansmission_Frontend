"use strict";

angular.module('shippersPortalApp.shipments.list',[

  ])
.controller('listController', function($scope, shipments, $state, $stateParams, shipmentsService, $q){
  $scope.init = function() {
    $scope.shipments = shipments.data.results;
    $scope.totalShipments = shipments.data.count;
    $scope.shipmentsPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('shipments', params, {reload: true})
  };

  $scope.addShipment = function() {
    var defer = $q.defer()
    shipmentsService.postShipment({})
    .then(function(response) {
      $state.go('shipments', {id: response.data.id, page: ''});
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }
})