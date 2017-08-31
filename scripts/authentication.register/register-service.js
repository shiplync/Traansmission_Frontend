angular.module('shippersPortalApp.authentication.register')
.factory('registerService', function ($http, $q, ENV, baseService, analytics, $rootScope) {

  var apis = {};

  apis.register = function (data) {
    var defer = $q.defer();
    var url = ENV.APIURL + 'register/';
    $http.post(url, data)
    .then(function (response) {
      analytics.register(data.user.email);
      if($rootScope.initialRegistrationData) {
        analytics.setInitialData($rootScope.initialRegistrationData);
      }
      defer.resolve(response);
    })
    .catch(function(err){
      defer.reject(err);
    });
    return defer.promise;
  };

  var companies_conf = {
    path: 'register/companies/self/'
  }

  var subscriptions_conf = {
    path: 'register/subscriptions/self/'
  }

  apis.patchCompany = function(data) {return baseService.patchObject(companies_conf, data)};
  apis.getCompany = function() {return baseService.getObject(companies_conf)};

  apis.patchSubscription = function(data) {return baseService.patchObject(subscriptions_conf, data)};
  apis.getSubscription = function() {return baseService.getObject(subscriptions_conf)};
  

	apis.regPay = function (data) {
		var defer = $q.defer();
		var url = ENV.APIURL + 'reg-pay/';
		$http.post(url, data).then(function (response) {
			defer.resolve(response);
		})
		.catch(function(err){
			defer.reject(err);
		});
		return defer.promise;
	}

  return apis;
});
