"use strict";

angular.module('shippersPortalApp.settings.companyaccount')
.controller('Company', function($scope, $rootScope, $stateParams, $state, companyaccountService, $filter, $q, ENV, AuthStatus, FileUploader, STATELIST){

  $scope.init = function() {
    $scope.company = angular.copy($rootScope.currentUser.company);
    $scope.stateList = STATELIST;
  }
  var deferUpload = {};

  $scope.updateBasic = function() {
    var defer = $q.defer();
    companyaccountService.updateCompany($scope.company)
    .then(function(response) {
      $scope.company = response.data;
      $rootScope.currentUser.company = angular.copy(response.data);
      defer.resolve(response.data);
      $state.go('^.^');
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject(err);
    })
    return defer.promise;
  }

  var uploader = $scope.uploader = new FileUploader({
    url: ENV.APIURL +'files/?path=company.logo',
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
    
  };
  uploader.onCompleteAll = function() {
    if(deferUpload) {
      companyaccountService.getCompany()
      .then(function(response) {
        $rootScope.currentUser.company = response.data;
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