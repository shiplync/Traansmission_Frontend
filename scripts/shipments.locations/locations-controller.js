"use strict";

angular.module('shippersPortalApp.shipments.locations')
.controller('Locations', function($scope, $stateParams, $filter, locationId, STATELIST, TIMEZONE_ABBR, $q, locationTypes, locations, $state, DeliveryStatus, cacheService){

  $scope.init = function() {
    $scope.location = $filter('filter')($scope.shipment.locations, function(location){
      return location.id.toString() === locationId;
    })[0];

    $scope.stateList = STATELIST;
    $scope.timezones = TIMEZONE_ABBR; 
    $scope.locationtypes = locationTypes;
    // US is currently default
    $scope.country_code = '1'; 
    $scope.location.time_range_type = $scope.location.time_range.time_range_start !== null ? 'range' : 'exact';
    $scope.updateLocationPickerTimes($scope.location);
  }

  $scope.updateLocationPickerTimes = function(location) {
    // Offset utc time with x hours where x = time_range.tz
    var offset = moment.tz(location.time_range.tz).format('Z').split(":");
    location.time_range.time_range_end_picker = location.time_range.time_range_end ? moment(location.time_range.time_range_end).add(offset[0], 'hours').add(offset[1], 'minutes') : null;
    location.time_range.time_range_start_picker = location.time_range.time_range_start ? moment(location.time_range.time_range_start).add(offset[0], 'hours').add(offset[1], 'minutes') : null;
  }

  $scope.updateLocationModelTimes = function(location) {
    // Offset utc time with x hours where x = time_range.tz
    var offset = moment.tz(location.time_range.tz).format('Z').split(":");
    location.time_range.time_range_end = location.time_range.time_range_end_picker ? moment(location.time_range.time_range_end_picker).subtract(offset[0], 'hours').add(offset[1], 'minutes') : null;
    location.time_range.time_range_start = location.time_range.time_range_start_picker ? moment(location.time_range.time_range_start_picker).subtract(offset[0], 'hours').add(offset[1], 'minutes') : null;
  }

  $scope.update = function() {
    var defer = $q.defer();
    var location = $scope.location;
    var shipment = $scope.$parent.$parent.shipment;

    locations.patchLocation(location, location.id)
    .then(function(response) {
      // Update and get missing coordinates
      return cacheService.updateCachedCoordinates(shipment.id)
    }, function(err) {
      $scope.fieldErrors = err.data;
    })
    .then(function(response) {
      var addresses = response.data;
      if (addresses.length > 0) {
        return cacheService.processMissingCoordinates(addresses);
      }
    })
    .then(function(response) {
      if(response) {
        // Update again
        return cacheService.updateCachedCoordinates(shipment.id);  
      }
    })
    .then(function(response) {
      // Update and get missing distances
      return cacheService.updateCachedDistances(shipment.id);  
    })
    .then(function(response) {
      var coordinates = response.data;
      if (coordinates.length > 0) {
        return cacheService.processMissingDistances(coordinates);
      }
    })
    .then(function(response) {
      if(response) {
        // Update again
        return cacheService.updateCachedDistances(shipment.id);  
      }
    })
    .then(function(response) {
      $state.go("^.^.^", {}, {reload: 'shipments'});
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }

})