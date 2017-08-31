"use strict";

angular.module('shippersPortalApp.constants.permissions', [])
  .constant('P', 
    {
      addShipment: 'add_shipment',
      viewShipment: 'view_shipment',
      changeShipment: 'change_shipment',
      deleteShipment: 'delete_shipment',

      addCompanyInvite: 'add_companyinvite',
      viewCompanyInvite: 'view_companyinvite',
      changeCompanyInvite: 'change_companyinvite',
      deleteCompanyInvite: 'delete_companyinvite',

      addCompanyDivision: 'add_companydivision',
      viewCompanyDivision: 'view_companydivision',
      changeCompanyDivision: 'change_companydivision',
      deleteCompanyDivision: 'delete_companydivision',

      addCompanyDivisionMembership: 'add_companydivisionmembership',
      viewCompanyDivisionMembership: 'view_companydivisionmembership',
      changeCompanyDivisionMembership: 'change_companydivisionmembership',
      deleteCompanyDivisionMembership: 'delete_companydivisionmembership',

      addGenericUser: 'add_genericuser',
      viewGenericUser: 'view_genericuser',
      changeGenericUser: 'change_genericuser',
      deleteGenericUser: 'delete_genericuser',

      addGenericCompany: 'add_genericcompany',
      viewGenericCompany: 'view_genericcompany',
      changeGenericCompany: 'change_genericcompany',
      deleteGenericCompany: 'delete_genericcompany',

      addUserInvite: 'add_userinvite',
      viewUserInvite: 'view_userinvite',
      changeUserInvite: 'change_userinvite',
      deleteUserInvite: 'delete_userinvite',

      addShipmentAssignment: 'add_shipmentassignment',
      viewShipmentAssignment: 'view_shipmentassignment',
      changeShipmentAssignment: 'change_shipmentassignment',
      deleteShipmentAssignment: 'delete_shipmentassignment',

      addTemplateLocation: 'add_savedlocation',
      viewTemplateLocation: 'view_savedlocation',
      changeTemplateLocation: 'change_savedlocation',
      deleteTemplateLocation: 'delete_savedlocation',

      addShipmentCarrierAssignment: 'add_shipmentcarrierassignment',
      viewShipmentCarrierAssignment: 'view_shipmentcarrierassignment',
      changeShipmentCarrierAssignment: 'change_shipmentcarrierassignment',
      deleteShipmentCarrierAssignment: 'delete_shipmentcarrierassignment',

      addShipmentDriverAssignment: 'add_shipmentdriverassignment',
      viewShipmentDriverAssignment: 'view_shipmentdriverassignment',
      changeShipmentDriverAssignment: 'change_shipmentdriverassignment',
      deleteShipmentDriverAssignment: 'delete_shipmentdriverassignment',
    }
  );