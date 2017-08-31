"use strict";

angular.module('shippersPortalApp')
.factory('baseService', function ($http, $q, ENV, analytics) {

  var apis = {}

  apis.getObject = function(conf, obj_id){
    var defer = $q.defer();
    var id_path = (obj_id != undefined ? obj_id + '/' : '');
    $http({
      url: ENV.APIURL + conf.path + id_path,
      method: 'GET',
      params: null
    })
    .then(function(response){
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.getPaginatedObjects = function(conf, params){
    var defer = $q.defer();
    $http({
      url: ENV.APIURL + conf.path,
      method: 'GET',
      params: params
    })
    .then(function(response){
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.postObject = function(conf, data){
    var defer = $q.defer();
    $http({
      url: ENV.APIURL + conf.path,
      method: 'POST',
      data: angular.toJson(data)
    })
    .then(function(response){
      if (conf.track) {analytics.track('create ' + conf.track, {'data': data})};
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.patchObject = function(conf, data, obj_id){
    var defer = $q.defer();
    var id_path = (obj_id != undefined ? obj_id + '/' : '');
    $http({
      url: ENV.APIURL + conf.path + id_path,
      method: 'PATCH',
      data: angular.toJson(data)
    })
    .then(function(response){
      if (conf.track) {analytics.track('update ' + conf.track, {'data': data, 'obj_id': obj_id})};
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  apis.deleteObject = function(conf, obj_id){
    var defer = $q.defer();
    $http({
      url: ENV.APIURL + conf.path + obj_id + '/',
      method: 'DELETE'
    })
    .then(function(response){
      if (conf.track) {analytics.track('delete ' + conf.track, {'obj_id': obj_id})};
      defer.resolve(response);
    })
    .catch(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }

  return apis;
});
