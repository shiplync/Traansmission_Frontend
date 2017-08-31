"use strict";

angular.module('shippersPortalApp')
.directive('textLabelField', function() {
  return {
    restrict: 'E',
    scope: {
      labelName: '=',
      labelValue: '=',
      hideIfEmpty: '=',
    },
    templateUrl: 'views/templates/text-label-field.html'
  };
});