"use strict";

angular.module('shippersPortalApp.geoservices.cache', [])
.factory('cacheService', function ($http, $q, ENV, geocoderService, distanceService) {

  var apis = {};

  var postCoordinateToCache = function(data) {
    var defer = $q.defer();
    $http({method:'POST', url:ENV.APIURL+'cachedcoordinates/', data:angular.toJson(data)}).then(function(response){
      defer.resolve(response);
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  var postDistanceToCache = function(data) {
    var defer = $q.defer();
    $http({method:'POST', url:ENV.APIURL+'cacheddistances/', data:angular.toJson(data)}).then(function(response){
      defer.resolve(response);
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  apis.getCoordinateFromCache = function(params) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL+'cachedcoordinates/',
      method: 'GET',
      params: params
    })
    .then(function(response){
      if (response.data){
        defer.resolve(response);
      }
      else{
        defer.reject(response);
      }
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  var getDistanceFromCache = function(params) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL+'cacheddistances/',
      method: 'GET',
      params: params
    })
    .then(function(response){
      if (response.data){
        defer.resolve(response);
      }
      else{
        defer.reject(response);
      }
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  apis.getAndPostCoordinate = function(address) {
    var defer = $q.defer();
    var param_values = Object.keys(address).map(function (key) {
      return address[key];
    });
    // Return empty response if no address
    if (param_values.join().length < param_values.length) {
      defer.resolve();
      return defer.promise;
    }
    geocoderService.geocode(param_values.join())
    .then(function(response) {
      if(response) {
        var data = address;
        data.coordinate = 'POINT(' + response.lng + ' ' + response.lat + ')';
        return postCoordinateToCache(data);
      }
    })
    .then(function(response) {
      defer.resolve(response)
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.getAndPostDistance = function(startEndCoord) {
    var defer = $q.defer();
    var data = {
      origins: [new google.maps.LatLng(startEndCoord.start_lat, startEndCoord.start_lon)],
      destinations: [new google.maps.LatLng(startEndCoord.end_lat, startEndCoord.end_lon)],
      travelMode: google.maps.TravelMode.DRIVING,
    };
    distanceService.getDistance(data)
    .then(function(response) {
      if(response) {
        var data = startEndCoord;
        startEndCoord.distance = response.rows[0].elements[0].distance.value;
        return postDistanceToCache(data);
      }
    })
    .then(function(response) {
      defer.resolve(response)
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.processMissingCoordinates = function(addresses) {
    var defer = $q.defer();
    $q.all(addresses.map(function(a) {
      return apis.getAndPostCoordinate(a);
    }))
    .then(function(response) {
      defer.resolve(response);  
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.processMissingDistances = function(coordinates) {
    var defer = $q.defer();
    $q.all(coordinates.map(function(c) {
      return apis.getAndPostDistance(c);
    }))
    .then(function(response) {
      defer.resolve(response);  
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.updateCachedCoordinates = function(shipment_id) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL+'shipments/' + shipment_id + '/updatecachedcoordinates/',
      method: 'GET',
      params: null
    })
    .then(function(response){
      if (response.data){
        defer.resolve(response);
      }
      else{
        defer.reject(response);
      }
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  apis.updateCachedDistances = function(shipment_id) {
    var defer = $q.defer();
    $http({
      url: ENV.APIURL+'shipments/' + shipment_id + '/updatecacheddistances/',
      method: 'GET',
      params: null
    })
    .then(function(response){
      if (response.data){
        defer.resolve(response);
      }
      else{
        defer.reject(response);
      }
    }, function(err){
      console.log(err);
      defer.reject(err);
    });
    return defer.promise;
  }

  return apis;
});
