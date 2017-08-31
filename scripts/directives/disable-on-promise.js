"use strict";

angular.module('shippersPortalApp')
.directive('disableOnPromise', function ($parse) {
  return {
    restrict: 'A',
    compile: function($element, attr) {
      var fn = $parse(attr.disableOnPromise);
      return function clickHandler(scope, element, attrs) {
        element.on('click', function(event) {
          attrs.$set('disabled', true);
          scope.$apply(function() {
            fn(scope, {$event:event}).finally(function() {
              attrs.$set('disabled', false);
            });
          });
        });
      };
    }
  };
});