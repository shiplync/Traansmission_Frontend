"use strict";

angular.module('shippersPortalApp.team.companies')
.factory('companiesService', function (baseService) {

  var apis = {}
  
  var conf = {
    path: 'team/companies/?show_logo=true',
    track: 'partner company'
  }

  apis.getCompany = function(obj_id) {return baseService.getObject(conf, obj_id)};
  apis.getPaginatedCompanies = function(params) {return baseService.getPaginatedObjects(conf, params)};

  return apis;
});
