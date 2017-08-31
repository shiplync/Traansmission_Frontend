"use strict";

angular.module('shippersPortalApp.authentication.resetpassword',[

  ])
.controller('resetPasswordController', ['$scope', '$state', 'authenticationService', function($scope, $state, authenticationService){
  $scope.init = function() {
    $scope.resetSubmitted = false;
  }

  
  $scope.resetPassword = function(){
    $scope.resetSubmitted = true;
    var email = $scope.email;
    $scope.resetSuccess = false;
    $scope.resetFailure = false;
    authenticationService.resetPassword(email).then(
      function(data){
        $scope.resetSuccess = true;
        $scope.resetSubmitted=false;
      }, function(error){
        $scope.resetFailure = true;
        $scope.resetSubmitted = false;
      });
  }

}])