"use strict";

angular.module('shippersPortalApp')
.directive('textFormFieldNolabel', function() {
  return {
    restrict: 'E',
    scope: {
      labelName: '=',
      modelName: '=',
      placeholder: '=',
      hasWarning: '=',
    errors: '=',
    },
    templateUrl: 'views/templates/text-form-field-nolabel.html'
  };
});