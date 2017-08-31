"use strict";

angular.module('shippersPortalApp.temlocations')
.controller('temlocationsListController', function($scope, locations, $state, $stateParams, STATELIST, temlocationsService, $q){
  $scope.init = function() {
    $scope.locations = locations.data.results;
    $scope.viewLocations = angular.copy(locations.data.results);
    $scope.totalLocations = locations.data.count;
    $scope.locationsPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
    $scope.stateList = STATELIST;
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('temlocations', params, {reload: true})
  };

  $scope.addLocation = function(params) {
    var defer = $q.defer();
    params.location_type = 1;
    temlocationsService.postLocation(params)
    .then(function(response) {
      $state.go('temlocation.edit', {id: response.data.id, location: response.data.id, page: ''});
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
})