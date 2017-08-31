"use strict";

angular.module('shippersPortalApp.constants.usertype', [])
  .constant('UserType', 
    {
      brokermanager: {
        value: 'brokermanager', 
        label: 'Broker manager', 
        company_type: 'shipper',
        level: 'manager',
      },
      brokersupervisor: {
        value: 'brokersupervisor', 
        label: 'Broker supervisor', 
        company_type: 'shipper',
        level: 'supervisor',
      },
      brokerrepresentative: {
        value: 'brokerrepresentative', 
        label: 'Broker Representative', 
        company_type: 'shipper',
        level: 'representative',
      },

      carriermanager: {
        value: 'carriermanager', 
        label: 'Admin', 
        company_type: 'carrier',
        level: 'manager',
      },
      carriersupervisor: {
        value: 'carriersupervisor', 
        label: 'Dispatcher', 
        company_type: 'carrier',
        level: 'supervisor',
      },
      carrierdriver: {
        value: 'carrierdriver', 
        label: 'Driver', 
        company_type: 'carrier',
        level: 'representative',
      },
    }
  );  