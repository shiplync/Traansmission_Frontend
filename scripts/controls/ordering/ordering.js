"use strict";

function OrderingController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    // Initialize default variables (if uninitialized)
    if (ctrl.isNestedView === undefined) {
      ctrl.isNestedView = false;
      ctrl.orderingKey = 'ordering';
    } else {
      ctrl.orderingKey = '_ordering';
    }
    if (ctrl.defaultOrdering === undefined) {
      ctrl.defaultOrdering = Object.keys(ctrl.orderingLabels)[0];
    }
    if (ctrl.defaultOrderAsc === undefined) {
      ctrl.defaultOrderAsc = true;
    }

    ctrl.params = $stateParams;
    
    // Load ordering specs from url
    if(ctrl.params[ctrl.orderingKey]) {
      Object.keys(ctrl.orderingLabels).forEach(function(key) {
        if(ctrl.params[ctrl.orderingKey].indexOf(key) >= 0) {
          ctrl.ordering = key;
          ctrl.orderAsc = ctrl.params[ctrl.orderingKey].charAt(0) === '-' ? false : true; 
        }
      })
    } else {
      ctrl.ordering = ctrl.defaultOrdering;
      ctrl.orderAsc = ctrl.defaultOrderAsc;
    }
  };

  var refresh = function(params) {
    $state.go('.', params);
  }

  ctrl.setFilters = function() {
    if (ctrl.isNestedView) {
      $stateParams._id = "";
    } else {
      $stateParams.id = "";
    }
    var params = ctrl.params;
    //Remove unnecessary parameters from url
    params[ctrl.orderingKey] = (ctrl.ordering === ctrl.defaultOrdering && ctrl.orderAsc === ctrl.defaultOrderAsc) ? '' : params[ctrl.orderingKey];
    refresh(params);
  }

  ctrl.setOrdering = function(ordering) {
    ctrl.ordering = ordering;
    var prefix = ctrl.orderAsc ? '' : '-';
    ctrl.params[ctrl.orderingKey] = prefix + ctrl.ordering;
    ctrl.setFilters();
  }
}

angular.module('shippersPortalApp').component('orderingControl', {
  templateUrl: 'scripts/controls/ordering/ordering.html',
  controller: OrderingController,
  bindings: {
    orderingLabels: '=',
    isNestedView: '=?',
    defaultOrdering: '=?',
    defaultOrderAsc: '=?'
  }
});