'use strict';

/**
 * @ngdoc service
 * @name shippersPortalApp.TIMEFORMAT
 * @description
 * # TIMEFORMAT
 * Constant in the shippersPortalApp.
 */
angular.module('shippersPortalApp')
  .constant('TIMEFORMAT', 'YYYY-MM-DDTHH:mm')
  .constant('TIMEZONE_ABBR', 
    [
      {
        'name': 'Eastern Standard Time',
        'abbreviation':'EST',
        'standard': 'US/Eastern'
      },
      {
        'name': 'Central Standard Time', 
        'abbreviation':'CST',
        'standard':'US/Central'
      },
      {
        'name': 'Mountain Standard Time',
        'abbreviation':'MST', 
        'standard':'US/Mountain'
      },
      {
        'name': 'Pacific Standard Time',
        'abbreviation':'PST',
        'standard':'US/Pacific'
      }
    ]
  );
