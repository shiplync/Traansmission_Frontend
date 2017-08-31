"use strict";

function DetailIsolateActionController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    
  };

  ctrl.toggleDetailState = function() {
    if($stateParams.id) {
      $state.go('.', {id: ''}, {inherit: false});
    } else {
      $state.go('.', {id: ctrl.detailId}, {inherit: false});
    }
  }
}

angular.module('shippersPortalApp').component('detailIsolateAction', {
  template: '<b class="text-color-gray pull-right"><a href="" ng-click="$ctrl.toggleDetailState()"> <span class="glyphicon glyphicon-record" aria-hidden="true"></span></a></b>',
  controller: DetailIsolateActionController,
  transclude: true,
  bindings: {
    detailId: '='
  }
});