// import directoryHtml from '../views/routes/directory.html'
// import homeHtml from '../views/routes/home.html'
// import individualDatacardHtml from '../views/routes/individual-datacard.html'
// import familyHtml from '../views/routes/family.html'
// import makeFamiliesHtml from '../views/routes/make-families.html'
// import editFamilyHtml from '../views/routes/edit-family.html'
// import loginHtml from '../views/routes/login.html'
// import registerHtml from '../views/routes/register.html'
// import adminHtml from '../views/routes/admin.html'
import ngRedux from 'ng-redux'
import reducers from '../state/reducers'
import {createLogger} from 'redux-logger'
import { rootSaga } from '../state/sagas'
import createSagaMiddleware from 'redux-saga'
import {getGroups} from '../api/realApi'

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default angular.module('app', 
['ngAnimate', 'ngRoute', 'ngMaterial', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit', 'ngRedux'])

.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', '$ngReduxProvider'
,function($routeProvider, $httpProvider, $mdThemingProvider, $ngReduxProvider){
  console.log('reduxProvider', $ngReduxProvider)
    $ngReduxProvider.createStoreWith(reducers, [logger, sagaMiddleware]);
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
                  templateUrl: 'assets/views/routes/individual-datacard.html',
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
                })
                .when('/groups', {
                  template: '<groups foo="\'hi\'"></groups>'
                })
                .when('/group', {
                  template: '<group></group>'
                })
                .when('/create-group', {
                  template: '<create-group></create-group>'
                })
                .otherwise({
                  redirectTo: '/directory',
                 templateUrl: 'assets/views/routes/directory.html',
                  controller: 'DirectoryController'
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
}])
.run(function($ngRedux, UserProfileService){
  UserProfileService.fetchProfile();
  sagaMiddleware.run(rootSaga);
  $ngRedux.dispatch({type:"FETCH_GROUPS"});
  $ngRedux.dispatch({type: "FETCH_MEMBERS"});

  const selectedGroupId = $ngRedux.getState().selectedGroupId;
  const storedGroupId = window.sessionStorage.getItem('groupId');
  if (!selectedGroupId && storedGroupId){
    $ngRedux.dispatch({type: "SET_SELECTED_GROUP_ID", value: storedGroupId})
  }
});