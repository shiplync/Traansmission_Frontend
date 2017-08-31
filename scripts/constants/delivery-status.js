"use strict";

angular.module('shippersPortalApp')
  .constant('DeliveryStatus', 
    {
      open: {value: '1', label: 'Open'},
      pendingApproval: {value: '5', label: 'Pending Approval'},
      pendingPickup: {value: '2', label: 'Pending Pickup'},
      enroute: {value: '3', label: 'Enroute'},
      delivered: {value: '4', label: 'Delivered'},
    }
  );