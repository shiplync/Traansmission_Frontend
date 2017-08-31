"use strict";

angular.module('shippersPortalApp.shipments.assigninternal.control', [])
.controller('AssigninternalController', function($scope, $controller, $stateParams, $filter, $q, users, $state, usersService, assigninternalService){
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
    $state.go('.', params, {reload: 'shipment'})
  };

  $scope.addShipmentAssignment = function(user) {
    var defer = $q.defer();
    assigninternalService.postShipmentAssignment({
      shipment: $scope.params.shipment,
      assignee_content_type: 'genericuser',
      assignee_id: user.id,
      r: true,
      can_delegate: true
    })
    .then(function(response) {
      $state.reload('shipments');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeShipmentAssignment = function(assignment_id) {
    var defer = $q.defer();
    assigninternalService.deleteShipmentAssignment(assignment_id)
    .then(function(response) {
      $state.reload('shipments');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  $scope.addShipmentDriverAssignment = function(user) {
    var defer = $q.defer();
    assigninternalService.postShipmentDriverAssignment({
      assignment: {
        shipment: $scope.params.shipment,
        assignee_content_type: 'genericuser',
        assignee_id: user.id,
        r: true,
        can_delegate: true
      }
    })
    .then(function(response) {
      $state.reload('shipments');
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeShipmentDriverAssignment = function(assignment_id) {
    var defer = $q.defer();
    assigninternalService.deleteShipmentDriverAssignment(assignment_id)
    .then(function(response) {
      $state.reload('shipments');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

})