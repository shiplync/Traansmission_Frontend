"use strict";

angular.module('shippersPortalApp')
.controller('ApplicationController', function ($scope, $rootScope, $location, $filter, AuthService, P, DeliveryStatus, $state, CompanyType, UserType, $stateParams) {
  // Second most top-level controller. For stuff that shouldn't go in the rootScope. 

  $scope.outputLength = function(meters) {
    var fractionSize = 0;
    return {
      value: $filter('number')((meters / $rootScope.userSettings.lengthUnit.mFactor), fractionSize),
      label: $rootScope.userSettings.lengthUnit.pluralLabel
    }
  }

  $scope.toggleState = function(state, params, goBackLevels) {
    goBackLevels = (goBackLevels==undefined ? 2 : goBackLevels);
    if($state.includes(state, params)) {
      var backStr = new Array(goBackLevels).fill('^').join('.');
      $state.go(backStr);
    } else {
      $state.go(state, params);
    }
  }

  $scope.outputLengthNumber = function(meters) {
    return Number(meters / $rootScope.userSettings.lengthUnit.mFactor)
  }

  $scope.inputLength = function(length) {
    return Number(length) * $rootScope.userSettings.lengthUnit.mFactor ;
  }

  $scope.hasSearchParam = function(param) {
    var params = $location.search();
    if (params[param]) {
      return true;
    } else {
      return false;
    }
  }

  $scope.hasIdParam = function() {
    var params = $location.search();
    if (params.id) {
      return true;
    } else {
      return false;
    }
  }

  $scope.hasSearchParams = function() {
    var params = $location.search();
    var count = 0;

    // Ignore certain parameters
    if (params.page) {count += 1};
    if (params.id) {count += 1};
    
    return Object.keys(params).length > count;
  }

  $scope.hasNestedSearchParams = function() {
    var params = $location.search();
    var count = 0;

    // Ignore certain parameters
    if (params._page) {count += 1};
    if (params._id) {count += 1};

    var filteredKeys = $filter('filter')(Object.keys(params), function(key) {
      return key.charAt(0) === '_';
    })
    
    return filteredKeys.length > count;
  }

  $scope.isAuthorized = function(actions) {
    return AuthService.isAuthorized(actions);
  }

  $scope.highlightState = function(state, params) {
    return $state.includes(state, params) ? 'active' : '';
  }

  $scope.hasProfilePhoto = function(user) {
    return (user.profile_photo && user.profile_photo.file_url) ? true : false;
  }

  $scope.hasCompanyLogo = function(company) {
    return (company.logo && company.logo.file_url) ? true : false;
  }

  $scope.P = P; 
  $scope.DeliveryStatus = DeliveryStatus;
  $scope.CompanyType = CompanyType;
  $scope.UserType = UserType;
})