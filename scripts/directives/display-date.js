"use strict";

angular.module('shippersPortalApp')
.filter('displayDate', function() {
  return function(date, timezone) {
    return moment(date).tz(timezone).format('MM/DD/YYYY @ h:mmA');
  };
});