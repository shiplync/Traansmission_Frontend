"use strict";

angular.module('shippersPortalApp.team.divisions.members.control', [])
.controller('DivisionMembersController', function($scope, $controller, $stateParams, $filter, $q, users, $state, divisionsService){
  'use strict';

  $scope.init = function() {
    $scope.params = $stateParams;
    $scope.rootState = '.';
    $scope.users = users.data.results;
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

    $scope.totalUsers = users.data.count;
    $scope.usersPerPage = 25;
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
    $state.go('.', params, {reload: 'division'})
  };

  $scope.assignUserToDivision = function(user) {
    var defer = $q.defer();
    divisionsService.postCompanyDivisionMembership({
      division: $scope.params.division,
      user: user.id
    })
    .then(function(response) {
      $state.reload('division');
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
      $state.reload('division');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

})