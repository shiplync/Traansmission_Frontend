"use strict";

function SettingsActionController($state, $stateParams) {
  var ctrl = this;

  ctrl.$onInit = function() {
    
  };
}

angular.module('shippersPortalApp').component('settingsAction', {
  template: '<a href="" class="left-heading-control"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>',
  controller: SettingsActionController,
  transclude: true,
  bindings: {
    
  }
});