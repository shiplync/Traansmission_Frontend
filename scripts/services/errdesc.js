'use strict';

/**
 * @ngdoc service
 * @name shippersPortalApp.errdesc
 * @description
 * # errdesc
 * Extract error description from error
 */
angular.module('shippersPortalApp')
  .service('errdesc', function () {
    return {
      get: function(err){
        try {
          if ('non_field_errors' in err.data) {return err.data.non_field_errors[0]};
          if ('detail' in err.data) {return err.data.detail};
          if ('__all__' in err.data) {return err.data.__all__[0]};
        } catch(error) {
          return null;
        }
      }
    };
  });
