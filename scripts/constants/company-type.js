"use strict";

angular.module('shippersPortalApp.constants.companytype', [])
  .constant('CompanyType', 
    {
      carrier: {value: 'carrier', label: 'Carrier'},
      shipper: {value: 'shipper', label: 'Shipper/Broker'}
    }
  );