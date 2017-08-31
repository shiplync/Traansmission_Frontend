"use strict";

angular.module('shippersPortalApp.geoservices.distance', ['ngStorage'])
.factory('distanceService', function ($localStorage, $q, $timeout, $rootScope) {

  var distances = $localStorage.distances ? JSON.parse($localStorage.distances) : {};
  var queue = [];
  var QUERY_PAUSE= 250;
  var executeNext = function () {
    var task = queue[0], distanceservice = new google.maps.DistanceMatrixService();
    distanceservice.getDistanceMatrix(task.data, function (result, status) {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        distances[JSON.stringify(task.data)] = result;

        $localStorage.distances = JSON.stringify(distances);

        queue.shift();
        task.d.resolve(result);

      } else if (status === google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT) {
        if (task.executedAfterPause) {
          queue.shift();
          task.d.reject({
            type: 'busy',
            message: 'Distance Matrix server is busy can not process address ' + JSON.stringify(task.data)
          });
        }
      } else if (status === google.maps.DistanceMatrixStatus.REQUEST_DENIED) {
        queue.shift();
        task.d.reject({
          type: 'denied',
          message: 'Request denied for distance matrix request ' + JSON.stringify(task.data)
        });
      } else {
        queue.shift();
        task.d.reject({
          type: 'invalid',
          message: 'Invalid request for distance matrix: status=' + status + ', data=' + JSON.stringify(task.data)
        });
      }
      if (queue.length) {
        if (status === google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT) {
          var nextTask = queue[0];
          nextTask.executedAfterPause = true;
          $timeout(executeNext, QUERY_PAUSE);
        } else {
          $timeout(executeNext, 0);
        }
      }
      if (!$rootScope.$$phase) { $rootScope.$apply(); }
    });
};

return {
  getDistance : function (data) {
    var d = $q.defer();
    if (_.has(distances, JSON.stringify(data))) {
      d.resolve(distances[JSON.stringify(data)]);
    } else {
      queue.push({
        data: data,
        d: d
      });
      if (queue.length === 1) {
        executeNext();
      }
    }
    return d.promise;
  }
};
});
