"use strict";

angular.module('shippersPortalApp.team.companyinvites')
.factory('companyinvitesService', function (baseService) {

  var apis = {}

  var conf = {
    path: 'companyinvites/',
    track: 'company invitation'
  }

  apis.getCompanyinvite = function(obj_id) {return baseService.getObject(conf, obj_id)};
  apis.getPaginatedCompanyinvites = function(params) {return baseService.getPaginatedObjects(conf, params)};
  apis.postCompanyinvite = function(data) {return baseService.postObject(conf, data)};
  apis.deleteCompanyinvite = function(obj_id) {return baseService.deleteObject(conf, obj_id)};

  return apis;
});
