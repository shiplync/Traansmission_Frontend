"use strict";

angular.module('shippersPortalApp.team.companies')
.controller('companiesListController', function($scope, companies, $state, $stateParams, companiesService, $q, companyinvitesService){
  $scope.init = function() {
    $scope.companies = companies.data.results;
    $scope.viewCompanies = angular.copy(companies.data.results);
    $scope.totalCompanies = companies.data.count;
    $scope.companiesPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('companies', params, {reload: true})
  };

  $scope.addCompanyinvite = function(data) {
    $scope.responseMsg = null;
    $scope.fieldErrors = null;
    var defer = $q.defer();
    companyinvitesService.postCompanyinvite(data)
    .then(function(response) {
      defer.resolve();
      $scope.responseMsg = 'You have successfully invited this company. They have now received an email with further instructions.';
      $scope.createObj = {};
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }
})