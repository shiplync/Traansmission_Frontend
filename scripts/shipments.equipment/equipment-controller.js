"use strict";

angular.module('shippersPortalApp.shipments.equipment')
.controller('Equipment', function($scope, $stateParams, $filter, $state, equipmentService, $q) {

  $scope.init = function() {
    $scope.checkedEquipmentTags = [];
    setEquipmentTagsOptions()
    .then(function(response) {
      getEquipmentTags();
    })
  }

  var setEquipmentTagsOptions = function() {
    var defer = $q.defer();
    equipmentService.equipmentTagsOptions()
    .then(function(response){
      $scope.tagCategoryChoices = response.data.actions.POST.tag_category.choices;
      $scope.tagTypeChoices = response.data.actions.POST.tag_type.choices.map(function(tag){
        tag.category = Math.ceil(tag.value / 1000);
        return tag;
      });
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  var getEquipmentTags = function() {
    equipmentService.getEquipmentTags($scope.$parent.shipment)
    .then(function(response){
      $scope.checkedEquipmentTags = response.data.map(function(checkedTag) {
        // Set checked value and db_object on corresponding TagTypeChoices object
        var tagTypeChoice = $filter('filter')($scope.tagTypeChoices, function(tag){
          return tag.value === checkedTag.tag_type
        })[0];
        tagTypeChoice.checked = true;
        tagTypeChoice.db_object = checkedTag;

        return checkedTag;
      });
    })
    .catch(function(err) {

    })
  }

  $scope.equipmentTagChanged = function(tag) {
    var defer = $q.defer();
    if(tag.checked){
      equipmentService.postEquipmentTag({
        tag_category: tag.category,
        tag_type: tag.value,
        assignee_content_type: 'shipment',
        assignee_id: $scope.$parent.shipment.id
      })
      .then(function(response){
        tag.db_object = response.data;
        defer.resolve();
      })
      .catch(function(err) {
        defer.reject();
      })
    } else {
      equipmentService.deleteEquipmentTag(tag.db_object)
      .then(function(response){
        tag.db_object = null;
        defer.resolve();
      })
      .catch(function(err) {
        defer.reject();
      })
    }
    return defer.promise;
  }

  $scope.update = function() {
    var defer = $q.defer();
    equipmentService.getEquipmentTags($scope.$parent.shipment)
    .then(function(response){
      $scope.shipment.equipmenttags = response.data;
      $state.go("^.^.^");
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
})