"use strict";

angular.module('shippersPortalApp.team.divisions')
.factory('divisionsService', function (baseService) {

  var apis = {}

  var division_conf = {
    path: 'divisions/',
    track: 'division'
  }

  var membership_conf = {
    path: 'divisionmemberships/',
    track: 'division membership'
  }

  apis.getDivision = function(obj_id) {return baseService.getObject(division_conf, obj_id)};
  apis.getPaginatedDivisions = function(params) {return baseService.getPaginatedObjects(division_conf, params)};
  apis.postDivision = function(data) {return baseService.postObject(division_conf, data)};
  apis.patchDivision = function(data, obj_id) {return baseService.patchObject(division_conf, data, obj_id)};
  apis.deleteDivision = function(obj_id) {return baseService.deleteObject(division_conf, obj_id)};

  apis.postCompanyDivisionMembership = function(data) {return baseService.postObject(membership_conf, data)};
  apis.deleteCompanyDivisionMembership = function(obj_id) {return baseService.deleteObject(membership_conf, obj_id)};

  return apis;
});
