"use strict";

angular.module('shippersPortalApp.team.companies', [
  'ui.router',
  
  'shippersPortalApp.constants.permissions',

  'shippersPortalApp.team.companies.control',
  // 'shippersPortalApp.team.companies.settings',
  ])
.config(function ($stateProvider, P) {
  $stateProvider
  .state("companies", {
    url: "/companies?:id:ordering:page",
    parent: "team",
    views: {
      "control@team": {
        templateUrl: "scripts/team.companies/companies.control.html",
        controller: "companiesControlController"
      },
      "content@index": { 
        templateUrl: "scripts/team.companies/companies.list.html",
        controller: "companiesListController"
      }
    },
    data: {
      permissions: [P.viewGenericCompany]
    },
    resolve: {
      companies: ['companiesService', '$stateParams',
      function(companiesService, $stateParams) {
        var params = $stateParams;
        return companiesService.getPaginatedCompanies(params);
      }],
      orderingLabels: function() {
        return {
          company_name: 'Company name'
        }
      }
    }
  })
  .state("company", {
    // To access this state, ':company' must be set. 
    // If target company is not in the parent's resolved set, use ':id' to get target company. 
    abstract: true,
    parent: 'companies',
    url: '/detail?:company', 
    views: {
      "detail": {
        template: '<div ng-if="company.id==companyId"><div ui-view="" autoscroll></div></div>',
        controller: ['$scope', '$stateParams', function($scope, $stateParams) {
          $scope.companyId = $stateParams.company;
        }]
      },
      "control@team": {
        template: '<button class="btn btn-default btn-sm navbar-control-buttons" ui-sref="^"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span> Back</button><div ui-view="control"></div>'
      },
    },
    resolve: {
      companyId: ['$stateParams', function($stateParams) {
        return $stateParams.company;
      }]
    },
    data: {
      permissions: [],
    },
  })
})