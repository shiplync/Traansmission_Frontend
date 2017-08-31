"use strict";

angular.module('shippersPortalApp.shipments.assignexternal.control', [])
.controller('AssignexternalController', function($scope, $controller, $stateParams, $filter, $q, companies, $state, companiesService, assignexternalService){
  'use strict';

  $scope.init = function() {
    $scope.params = $stateParams;
    $scope.rootState = '.';
    $scope.companies = companies.data.results;
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

    $scope.totalCompanies = companies.data.count;
    $scope.companiesPerPage = 25;
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

  $scope.addShipmentAssignment = function(company) {
    var defer = $q.defer();
    assignexternalService.postShipmentAssignment({
      shipment: $scope.params.shipment,
      assignee_content_type: 'genericcompany',
      assignee_id: company.id,
      r: true,
      can_delegate: true
    })
    .then(function(response) {
      $state.reload('shipment');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeShipmentAssignment = function(assignment_id) {
    var defer = $q.defer();
    assignexternalService.deleteShipmentAssignment(assignment_id)
    .then(function(response) {
      $state.reload('shipment');
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

  // $scope.setShipmentCarrierAssignment = function(company) {
  //   var defer = $q.defer();
  //   if(company.shipment_assignment && company.shipment_assignment.carrier_assignment) {
  //     assignexternalService.deleteShipmentCarrierAssignment(company.shipment_assignment.carrier_assignment)
  //     .then(function(response) {
  //       $state.reload('shipment');
  //       defer.resolve();
  //     })
  //     .catch(function(err) {
  //       defer.reject();
  //     })
  //   } else {
  //     assignexternalService.postShipmentCarrierAssignment({
  //       assignment: {
  //         shipment: $scope.params.shipment,
  //         assignee_content_type: 'genericcompany',
  //         assignee_id: company.id,
  //         r: true,
  //         can_delegate: true
  //       }
  //     })
  //     .then(function(response) {
  //       $state.reload('shipment');
  //       defer.resolve();
  //     })
  //     .catch(function(err) {
  //       defer.reject();
  //     })
  //   }
  //   return defer.promise;
  // }

})