"use strict";

angular.module('shippersPortalApp')
.directive('textFormField', function() {
  return {
    restrict: 'E',
    scope: {
      labelName: '=',
      modelName: '=',
      placeholder: '=',
      hasWarning: '=',
	  errors: '=',
    },
    templateUrl: 'views/templates/text-form-field.html'
  };
});