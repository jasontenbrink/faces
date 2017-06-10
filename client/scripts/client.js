// import directoryHtml from '../views/routes/directory.html'
// import homeHtml from '../views/routes/home.html'
// import individualDatacardHtml from '../views/routes/individual-datacard.html'
// import familyHtml from '../views/routes/family.html'
// import makeFamiliesHtml from '../views/routes/make-families.html'
// import editFamilyHtml from '../views/routes/edit-family.html'
// import loginHtml from '../views/routes/login.html'
// import registerHtml from '../views/routes/register.html'
// import adminHtml from '../views/routes/admin.html'

export default angular.module('app', 
['ngAnimate', 'ngRoute', 'ngMaterial', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit', 'react'])

.config(['$routeProvider', '$httpProvider', '$mdThemingProvider'
,function($routeProvider, $httpProvider, $mdThemingProvider){
    $httpProvider.interceptors.push('AuthenticationRedirectInjector');
    $routeProvider.when('/directory', {
                  templateUrl: 'assets/views/routes/directory.html',
                  controller: 'DirectoryController'
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
                })
                .when('/admin', {
                  templateUrl:'assets/views/routes/admin.html',
                  controller: 'AdminController'
                }).
                otherwise({
                  redirectTo: '/login',
                  templateUrl:'assets/views/routes/login.html',
                  controller: 'LoginController'
                });
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'hue-1': '50',
            'hue-2': '700',
            'hue-3': '900'
        })
        .accentPalette('grey', {
            'hue-1': '50',
            'hue-2': '700',
            'hue-3': '900'
        });
}]);