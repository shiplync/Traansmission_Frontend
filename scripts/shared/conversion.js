"use strict";

angular.module('shippersPortalApp.shared.conversion', [])
.directive('lengthConversion', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function(data) {
        //convert data from view format to model format
        return scope.inputLength(data); //converted
      });

      ngModelController.$formatters.push(function(data) {
        //convert data from model format to view format
        return data ? scope.outputLength(data).value : ''; //converted
      });
    }
  }
})
.directive('usPhoneConversion', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function(data) {
        //convert data from view format to model format
        if(data) {
          return '+1' + data; //converted
        } else {
          return data;
        }
      });

      ngModelController.$formatters.push(function(data) {
        //convert data from model format to view format
        if(data) {
          return data.replace('+1', ''); //converted
        } else {
          return data;
        }
      });
    }
  }
});