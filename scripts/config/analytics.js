angular.module('shippersPortalApp')
.factory('analytics', function (ENV, $window, $location) {

  var apis = {};

  apis.register = function(email) {
    if (ENV.track) {
      mixpanel.alias(email);
      mixpanel.identify(email);
    }
  }

  apis.login = function(email) {
    if (ENV.track) {
      mixpanel.identify(email);
    }
  }

  apis.track = function(name, data) {
    if (ENV.track) {
      mixpanel.track(name, data);
    }
  }

  apis.setUser = function(user) {
    if (ENV.track) {
      mixpanel.identify(user.email);
      mixpanel.people.set({
        "$email": user.email,
        "$first_name": user.first_name,
        "$last_name": user.last_name,
        "user_type": user.user_type.label,
        "company_name": user.company.company_name,
        "company_city": user.company.city,
        "company_state": user.company.state
      });
    }
  }

  apis.setInitialData = function(data) {
    if (ENV.track) {
      mixpanel.people.set_once(data);
    }
  }

  apis.trackPageView = function() {
    if ($window.ga && ENV.track) {
      $window.ga('send', 'pageview', {
        page: $location.path()
      });
    }
  }

  return apis;
});
