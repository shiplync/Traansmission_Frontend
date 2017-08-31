"use strict";

angular.module('shippersPortalApp.team.users')
.factory('usersService', function (baseService) {

  var apis = {}
  
  var conf = {
    path: 'team/users/',
    track: 'user'
  }

  apis.getUser = function(obj_id) {return baseService.getObject(conf, obj_id)};
  apis.getPaginatedUsers = function(params) {return baseService.getPaginatedObjects(conf, params)};
  apis.patchUser = function(data, obj_id) {return baseService.patchObject(conf, data, obj_id)};

  return apis;
});
