"use strict";

angular.module('shippersPortalApp.team.divisions')
.controller('divisionsListController', function($scope, divisions, $state, $stateParams, divisionsService, $q){
  $scope.init = function() {
    $scope.divisions = divisions.data.results;
    $scope.viewDivisions = angular.copy(divisions.data.results);
    $scope.totalDivisions = divisions.data.count;
    $scope.divisionsPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('divisions', params, {reload: true})
  };

  $scope.addDivision = function(data) {
    var defer = $q.defer();
    divisionsService.postDivision(data)
    .then(function(response) {
      $state.go('.', {id: '', division: '', page: ''}, {reload: true});
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }
})