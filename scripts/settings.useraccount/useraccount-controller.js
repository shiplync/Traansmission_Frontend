"use strict";

angular.module('shippersPortalApp.settings.useraccount')
.controller('User', function($scope, $rootScope, $stateParams, $state, userService, $filter, $q, ENV, AuthStatus, FileUploader, analytics){

  $scope.init = function() {
    $scope.user = angular.copy($rootScope.currentUser);
    $scope.password = {};
  }
  var deferUpload = {};

  $scope.updateBasic = function() {
    var defer = $q.defer();
    userService.updateUser($scope.user)
    .then(function(response) {
      $scope.user = response.data;
      analytics.setUser($scope.user);
      $rootScope.currentUser = angular.copy(response.data);
      defer.resolve(response.data);
      $state.go('^.^');
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject(err);
    })
    return defer.promise;
  }

  $scope.updatePassword = function() {
    var defer = $q.defer();
    $scope.err = "";
    if($scope.password.new === $scope.password.new_repeat) {
      userService.updatePassword($scope.password.old, $scope.password.new)
      .then(function(response) {
        defer.resolve(response.data);
        $state.go('^.^');
      })
      .catch(function(err) {
        $scope.err = err.data;
        defer.reject(err.data);
      })
      
    } else {
      $scope.err = "New passwords don't match";
      defer.reject();
    }
    return defer.promise;
  }

  var uploader = $scope.uploader = new FileUploader({
    url: ENV.APIURL +'files/?path=profile_photo',
    queueLimit: 2,
    removeAfterUpload: true,
  });

  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {

  };
  uploader.onAfterAddingFile = function(fileItem) {
    $scope.err = "";
    // if there's already a file on the queue remove it
    if ($scope.uploader.queue.length > 1){
      $scope.uploader.removeFromQueue(0);
    }
    if (!(fileItem.file.size <= 10485760)){
      fileItem.remove();
      $scope.$apply();
      $scope.err = 'Your photo was too large. Please try uploading a photo of size 10MB or less.';
    }
  };
  uploader.onAfterAddingAll = function(addedFileItems) {

  };
  uploader.onBeforeUploadItem = function(item) {
    item.headers = {'Authorization': 'Token ' + AuthStatus.getToken()};
  };
  uploader.onProgressItem = function(fileItem, progress) {

  };
  uploader.onProgressAll = function(progress) {

  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {

  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    $scope.err = "Unable to upload file";
    if(deferUpload) {deferUpload.reject()};
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {

  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    var profile_photo = response;
  };
  uploader.onCompleteAll = function() {
    if(deferUpload) {
      userService.getUser()
      .then(function(response) {
        $rootScope.currentUser = response.data;
        deferUpload.resolve();
        $state.go("^.^")
      })
      .catch(function(err) {

      })
    }
  };

  $scope.defferedUploadAll = function() {
    deferUpload = $q.defer();
    uploader.uploadAll();
    return deferUpload.promise;
  }

})