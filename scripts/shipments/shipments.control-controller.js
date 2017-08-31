"use strict";

angular.module('shippersPortalApp.shipments.control',[
  'checklist-model',
  'shippersPortalApp.geoservices.geocoder',
  ])
.controller('controlController', function($scope, $state, shipments, DeliveryStatus, $location, geocoderService, $stateParams, shipmentsService, $q, cacheService, P, orderingLabels) {
  $scope.init = function() {
    $scope.params = $stateParams;

    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;

    $scope.deliveryStatus = DeliveryStatus;
    $scope.defaultRadius = 200; // Miles / kilometers
    $scope.locationLabels = {
      first_location: 'Pick up', 
      last_location: 'Drop off'
    };
    $scope.defaultLocationLabel = $scope.locationLabels.first_location;
    
    if($scope.params.delivery_status != undefined && $scope.params.delivery_status instanceof Array !== true) {
      $scope.params.delivery_status = [$scope.params.delivery_status];
    }
  }
  
  var refresh = function(params) {
    $state.go('shipments', params);
  }
  
  $scope.setFilters = function() {
    $stateParams.id = "";
    if($scope.params.d_query) {
      // Get and set latlon parameter
      cacheService.getCoordinateFromCache({address: $scope.params.d_query})
      .then(function(response) {
        if(response.data.results.length > 0) {
          // Return cached result
          return response.data.results[0];
        } else {
          // Geocode address, post result to cache and then return result
          return cacheService.getAndPostCoordinate({address: $scope.params.d_query});
        }
      })
      .then(function(response) {
        return response.data ? response.data : response;
      })
      .then(function(response) {
        if(response) {
          if (!$scope.params.d_latlon) {
            $scope.params.ordering = 'proximity';
            $scope.orderAsc = true;
          }
          $scope.params.d_latlon = response.latitude + ',' + response.longitude;
          $scope.params.d_target = $scope.params.d_target === undefined ? 'first_location' : $scope.params.d_target;
          $scope.params.d_radius = $scope.params.d_radius === undefined ? $scope.inputLength($scope.defaultRadius).toString() : $scope.params.d_radius;
        }
        refresh($scope.params);
      })
      .catch(function(err) {
        refresh($scope.params);
      })
    } else {
      // No distance information specified
      $scope.params.d_latlon = "";
      var params = $scope.params;
      // Remove unnecessary parameters from url
      params.d_radius = '';
      params.d_target = '';
      params.ordering = params.ordering === '-id' || params.ordering === 'proximity' ? '' : params.ordering;
      refresh(params);
    }
  }
})