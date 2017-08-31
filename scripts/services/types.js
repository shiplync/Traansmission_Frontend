'use strict';

/**
 * @ngdoc service
 * @name shippersPortalApp.types
 * @description
 * # types
 * Get types
 */
angular.module('shippersPortalApp')
  .service('types', function () {
    var companyTypes = [
      {'key': 'unknown', 'name': 'Unknown', 'value': 0},
      {'key': 'shipper', 'name': 'Shipper/Broker', 'value': 1},
      {'key': 'carrier', 'name': 'Carrier', 'value': 2}
    ];
    return {
      companyTypeFromInt: function(i){
        var result  = companyTypes.filter(function(t){return t.value == i;} );
        return result ? result[0] : null;
      }, 
      companyTypeFromKey: function(key){
        var result  = companyTypes.filter(function(t){return t.key == key;} );
        return result ? result[0] : null;
      }
    };
  })
  .constant('locationTypes', 
    [
      {
        'name': 'Pick up',
        'value':1
      },
      {
        'name': 'Pick up and drop off',
        'value':2
      },
      {
        'name': 'Drop off',
        'value':3
      }
    ]
  );