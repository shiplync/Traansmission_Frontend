"use strict";

angular.module('shippersPortalApp.settings.companyaccount')
.factory('companyaccountService', function (baseService) {

  var apis = {};

  var conf = {
    path: 'companies/self/',
    track: 'own company'
  }

  apis.updateCompany = function(data) {return baseService.patchObject(conf, data)};
  apis.getCompany = function() {return baseService.getObject(conf)};
  
  return apis;
});
