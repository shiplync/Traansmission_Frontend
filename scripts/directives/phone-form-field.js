"use strict";

angular.module('shippersPortalApp')
.directive('phoneFormField', function() {
  return {
    restrict: 'A',
    scope: {
      labelName: '=',
      modelName: '=',
      placeholder: '=',
	  errors: '=',
    },
    templateUrl: 'views/templates/text-form-field.html'
  };
});