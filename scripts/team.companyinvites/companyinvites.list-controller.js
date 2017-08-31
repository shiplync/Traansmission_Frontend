"use strict";

angular.module('shippersPortalApp.team.companyinvites')
.controller('companyinvitesListController', function($scope, companyinvites, $state, $stateParams, companyinvitesService, $q){
  $scope.init = function() {
    $scope.companyinvites = companyinvites.data.results;
    $scope.viewCompanyinvites = angular.copy(companyinvites.data.results);
    $scope.totalCompanyinvites = companyinvites.data.count;
    $scope.companyinvitesPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('companyinvites', params, {reload: true})
  };

  $scope.deleteCompanyinvite = function(invite) {
    var defer = $q.defer();
    companyinvitesService.deleteCompanyinvite(invite.id)
    .then(function(response){
      $state.go(".", {id: '', page: '', companyinvite: ''}, {reload: true});
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
})