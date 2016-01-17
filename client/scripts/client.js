var app = angular.module('app',['ngAnimate','ngRoute', 'ui.grid', 'ui.grid.selection','ngMaterial', 'ui.grid.exporter']);
app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('AuthenticationRedirectInjector');

  $routeProvider.when('/directory', {
                  templateUrl: 'assets/views/routes/directory.html',
                  controller: "DirectoryController"
                })
                .when('/home', {
                  templateUrl: 'assets/views/routes/home.html',
                  controller: 'HomeController'
                })
                .when('/individualDatacard', {
                  templateUrl:'assets/views/routes/individual-datacard.html',
                  controller: 'IndividualDatacardController'
                })
                .when('/family', {
                  templateUrl:'assets/views/routes/family.html',
                  controller: 'FamilyDatacardController'
                })
                .when('/make-families', {
                  templateUrl:'assets/views/routes/make-families.html',
                  controller: 'MakeFamiliesController'
                })
                .when('/edit-family', {
                  templateUrl:'assets/views/routes/edit-family.html',
                  controller: 'EditFamilyController'
                })
                .when('/login', {
                  templateUrl:'assets/views/routes/login.html',
                  controller: 'LoginController'
                })
                .when('/register', {
                  templateUrl:'assets/views/routes/register.html',
                  controller: 'RegisterController'
                }).
                otherwise({
                  redirectTo: '/login',
                  templateUrl:'assets/views/routes/login.html',
                  controller: 'LoginController'
                });
}]);


//'ngRoute', 'ngAnimate'
