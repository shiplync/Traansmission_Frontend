"use strict";

function BackController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    
  };
}

angular.module('shippersPortalApp').component('backControl', {
  templateUrl: 'scripts/controls/back/back.html',
  controller: BackController,
  bindings: {
    rootState: '='
  }
});