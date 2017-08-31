"use strict";

angular.module('shippersPortalApp.team.userinvites')
.factory('userinvitesService', function (baseService) {

  var apis = {}

  var conf = {
    path: 'userinvites/',
    track: 'user invitation'
  } 

  apis.getUserinvite = function(obj_id) {return baseService.getObject(conf, obj_id)};
  apis.getPaginatedUserinvites = function(params) {return baseService.getPaginatedObjects(conf, params)};
  apis.postUserinvite = function(data) {return baseService.postObject(conf, data)};
  apis.deleteUserinvite = function(obj_id) {return baseService.deleteObject(conf, obj_id)};

  return apis;
});
