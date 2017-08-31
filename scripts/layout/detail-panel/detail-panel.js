"use strict";

function DetailPanelController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    
  };
}

angular.module('shippersPortalApp').component('detailPanel', {
  templateUrl: 'scripts/layout/detail-panel/detail-panel.html',
  controller: DetailPanelController,
  transclude: {
    settingsAction: '?settingsAction',
    detailIsolateAction: '?detailIsolateAction',
    detailContent: 'detailContent',
    subdetailContent: 'subdetailContent',
  },
  bindings: {
    detailObj: '=',
    headingTitle: '=',
  }
});