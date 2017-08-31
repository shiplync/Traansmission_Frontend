"use strict";

angular.module('shippersPortalApp.team.users')
.controller('usersListController', function($scope, users, $state, $stateParams, usersService, userinvitesService, $q){
  $scope.init = function() {
    $scope.users = users.data.results;
    $scope.viewUsers = angular.copy(users.data.results);
    $scope.totalUsers = users.data.count;
    $scope.usersPerPage = 10;
    $scope.pagination = {
      current: $stateParams.page
    };
  }

  $scope.pageChanged = function(newPage) {
    var params = $stateParams;
    params.page = newPage;
    $state.go('users', params, {reload: true})
  };

  $scope.addUserinvite = function(data) {
    $scope.responseMsg = null;
    $scope.fieldErrors = null;
    var defer = $q.defer();
    userinvitesService.postUserinvite(data)
    .then(function(response) {
      //$state.go('userinvite', {id: response.data.id, userinvite: response.data.id, page: ''});
      defer.resolve();
      $scope.responseMsg = 'You have successfully invited this person. They have now received an email with further instructions.';
      $scope.createObj = {};
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }
})