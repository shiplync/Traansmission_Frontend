"use strict";

function ClearController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    if (ctrl.isNestedView === undefined) {
      ctrl.isNestedView = false;
    }
  };

  ctrl.clearFilters = function() {
    var params = {};
    // Keep non-nested attrs if nested view
    if(ctrl.isNestedView && $stateParams) {
      Object.keys($stateParams).map(function(key) {
        if (key.charAt(0) !== '_') {
          params[key] = $stateParams[key];
        };
      })
    }
    $state.go(ctrl.rootState, params, {inherit: false});
  }
}

angular.module('shippersPortalApp').component('clearControl', {
  templateUrl: 'scripts/controls/clear/clear.html',
  controller: ClearController,
  bindings: {
    rootState: '=',
    isNestedView: '=?'
  }
});