"use strict";

angular.module('shippersPortalApp.team.userinvites')
.controller('userinvitesListController', function($scope, userinvites, $state, $stateParams, userinvitesService, $q){
  $scope.init = function() {
    $scope.userinvites = userinvites.data.results;
    $scope.viewUserinvites = angular.copy(userinvites.data.results);
    $scope.totalUserinvites = userinvites.data.count;
    $scope.userinvitesPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('userinvites', params, {reload: true})
  };

  $scope.deleteUserinvite = function(invite) {
    var defer = $q.defer();
    userinvitesService.deleteUserinvite(invite.id)
    .then(function(response){
      $state.go(".", {id: '', page: '', userinvite: ''}, {reload: true});
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
})