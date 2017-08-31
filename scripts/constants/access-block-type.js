"use strict";

angular.module('shippersPortalApp.constants.accessblocktype', [])
  .constant('AccessBlockType', 
    {
      unverified: {
        gotoState: 'unverified', 
        validStates: ['unverified'], 
      },
      pendingregistration: {
        gotoState: 'register.company', 
        validStates: ['register.company'], 
      },
      trialexpired: {
        gotoState: 'trialexpired', 
        validStates: ['trialexpired'], 
      },
    }
  );  