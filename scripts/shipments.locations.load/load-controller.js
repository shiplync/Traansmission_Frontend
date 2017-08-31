"use strict";

angular.module('shippersPortalApp.shipments.locations.load')
.controller('LocationsLoadController', function($scope, $controller, $stateParams, $filter, $q, locations, $state, locationId, temlocationsService, orderingLabels){
  'use strict';

  $scope.init = function() {
    $scope.orderingLabels = orderingLabels;
    $scope.rootState = $state.$current.name;

    $scope.params = $stateParams;
    $scope.rootState = '.';
    $scope.locations = locations.data.results;
    $scope.totalLocations = locations.data.count;
    $scope.locationsPerPage = 25;
    $scope.pagination = {
      current: $stateParams._page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params._page = newPage;
    $state.go('.', params, {reload: 'shipment.location'})
  };

  $scope.loadFromTemlocation = function(temlocation, shipment) {
    var defer = $q.defer();
    var res = $filter('filter')(shipment.locations, function(l){
      return l.id == locationId;
    });
    var location = res.length ? res[0] : null;

    if(location) {
      location.company_name = temlocation.company_name;
      location.address_details.address = temlocation.address_details.address;
      location.address_details.address_2 = temlocation.address_details.address_2;
      location.address_details.city = temlocation.address_details.city;
      location.address_details.state = temlocation.address_details.state;
      location.address_details.zip_code = temlocation.address_details.zip_code;
      location.contact.first_name = temlocation.contact.first_name;
      location.contact.last_name = temlocation.contact.last_name;
      location.contact.email = temlocation.contact.email;
      location.contact.phone = temlocation.contact.phone;
    }

    // Do a patch to set updated_at for recently used ordering
    temlocationsService.patchLocation({}, temlocation.id)
    .then(function(response) {
      $state.go('^.edit');
      defer.resolve();
    })
    .catch(function(err) {
      $state.go('^.edit');
      defer.reject();
    })
    return defer.promise;
  }

})