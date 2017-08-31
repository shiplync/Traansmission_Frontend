angular.module('shippersPortalApp.shipments.trip')
.controller('Trip', function($scope, tripService, $filter) {

  $scope.init = function() {

  }
  var bounds = new google.maps.LatLngBounds();
  var getMarker = function(data){
    var marker = null;
    if (data.marker) {
      marker = data.marker;
    } else {
      marker = new google.maps.Marker({
        position: data.point,
        map: $scope.map,
        draggable: false,
        label: data.label ? data.label : null 
      });
    }      
    if(data.class == 'tracking-list-update') {
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        strokeColor: (data.highlighted ? 'red' : '#555555')
      });
    }
    return marker;
  }

  $scope.addtripService = function(update){
    update['marker'] = getMarker(update);
    update.marker['animation'] = google.maps.Animation.DROP;
    var infowindow = new google.maps.InfoWindow({
      content: update.title
    });
    if(update.point) {
      bounds.extend(update.point);
      $scope.map.fitBounds(bounds);
      google.maps.event.addListener(update.marker, 'mouseover', function() {            
        $scope.addHighlightTrackingUpdate(update);
        infowindow.open($scope.map, update.marker);
      });
      google.maps.event.addListener(update.marker, 'mouseout', function() {
        $scope.removeHighlightTrackingUpdate(update);
        infowindow.close($scope.map, update.marker);
      });
    }
    if(update.showInList){
      $scope.trackingUpdates.push(update);  
    }        
  };

  // add points to map once it has loaded    
  $scope.$watch('map', function(newValue, oldValue) {
    var dateFormat = 'h:mm A z, MMM D';
    var shipmentId = $scope.shipment.id;
    $scope.trackingUpdates = [];
    $scope.shipment.locations.forEach(function(location, i) {
      var lat = location.latitude;
      var lng = location.longitude;
      if (lat && lng) {
        var point = new google.maps.LatLng(lat,lng);
        var pickUpUpdate = {
          'title': (location.arrival_time ? moment(location.arrival_time).format(dateFormat) : location.location_type.label),
          'body': (location.arrival_time ? 'Location ' + (i+1) + ': ' + location.location_type.label : null),
          'timestamp': moment(location.arrival_time),
          'point': point,
          'highlighted' : false,
          'class': 'tracking-list-location',
          'showInList': (location.arrival_time ? true : false),
          'label': (i+1).toString()
        }
        $scope.addtripService(pickUpUpdate);
      }
    });
    tripService.getByShipment(shipmentId).then(
      function(response){
        var data = response.data;
        if (data.length > 0) {
            //Add tracking updates
            var i = 0;
            for (i = 0; i < data.length; i++) { 
              var newTime = data[i];
              var lat = newTime.latitude;
              var lng = newTime.longitude;
              var point = new google.maps.LatLng(lat,lng);
              var trackingUpdate = {
                'title': moment(newTime.timestamp).format(dateFormat),
                'body': (data[i].display_text ? data[i].display_text : null),
                'timestamp': moment(newTime.timestamp),
                'point': point,
                'highlighted' : false,
                'class': 'tracking-list-update',
                'showInList': true
              }
              $scope.addtripService(trackingUpdate); 
            }
          } else {
            // Add spacer
            var spacer = {
              'title': null,
              'body': 'No tracking updates',
              'point': null,
              'highlighted' : false,
              'class': 'tracking-list-spacer',
              'showInList': true
            }
          }            
          $scope.trackingUpdates = $filter('orderBy')($scope.trackingUpdates, function(update) {
            return update.timestamp;
          });
        },
        function(err){
          console.log(err);
        });
});

$scope.addHighlightTrackingUpdate = function(u){
  u.highlighted = true;
  u.marker = getMarker(u);
  $scope.$parent.$evalAsync();
}

$scope.removeHighlightTrackingUpdate = function(u){      
  u.highlighted = false;
  u.marker = getMarker(u);
  $scope.$parent.$evalAsync();
}

$scope.getTrackingUpdateClass = function(trackingUpdate) {
  if(trackingUpdate.highlighted) {
    return 'tracking-update-list-element tracking-update-list-element-highlighted';
  } else {
    return 'tracking-update-list-element ';
  }
}


})