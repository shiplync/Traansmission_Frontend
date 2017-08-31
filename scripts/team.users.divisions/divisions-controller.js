"use strict";

angular.module('shippersPortalApp.team.users.divisions.control', [])
.controller('DivisionsController', function($scope, $controller, $stateParams, $filter, $q, divisions, $state, divisionsService){
  'use strict';

  $scope.init = function() {
    $scope.params = $stateParams;
    $scope.rootState = '.';
    $scope.divisions = divisions.data.results;
    $scope.orderingLabels = {
      id: 'ID #',
    };
    // Set ordering based on url params
    if($scope.params._ordering) {
      Object.keys($scope.orderingLabels).forEach(function(key) {
        if($scope.params._ordering.indexOf(key) >= 0) {
          $scope.ordering = key;
          $scope.orderAsc = $scope.params._ordering.charAt(0) === '-' ? false : true; 
        }
      })
    } else {
      $scope.ordering = 'id';
      $scope.orderAsc = false;
    }

    $scope.totalDivisions = divisions.data.count;
    $scope.divisionsPerPage = 25;
    $scope.pagination = {
      current: $stateParams._page
    };
  }

  var refresh = function(params) {
    $state.go($scope.rootState, params);
  }

  $scope.setFilters = function() {
    $stateParams._id = "";
    $stateParams._page = "";
    var params = $scope.params;
    params._ordering = params._ordering === '-id' ? '' : params._ordering;
    refresh(params);
  }

  $scope.setOrdering = function(ordering) {
    $scope.ordering = ordering;
    var prefix = $scope.orderAsc ? '' : '-';
    $scope.params._ordering = prefix + $scope.ordering;
    $scope.setFilters();
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params._page = newPage;
    $state.go('.', params, {reload: 'user'})
  };

  $scope.assignUserToDivision = function(division) {
    var defer = $q.defer();
    divisionsService.postCompanyDivisionMembership({
      division: division.id,
      user: $scope.params.user
    })
    .then(function(response) {
      $state.reload('user');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeUserFromDivision = function(membership_id) {
    var defer = $q.defer();
    divisionsService.deleteCompanyDivisionMembership(membership_id)
    .then(function(response) {
      $state.reload('user');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

})