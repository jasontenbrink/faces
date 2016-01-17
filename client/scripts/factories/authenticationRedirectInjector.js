app.factory("AuthenticationRedirectInjector", ['$location', function($location){
var authenticationRedirect = {
          responseError: function (response) {
            console.log('injector, response', response);
            if (response.status===401){
              $location.path('/login');
            }
          }
        };
return authenticationRedirect;
}]);
