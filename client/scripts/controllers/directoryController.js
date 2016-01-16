app.controller('DirectoryController',['$scope', 'DataService', 'uiGridConstants','$timeout',
function ($scope, DataService, uiGridConstants, $timeout) {

  var dataService = DataService;

  $scope.sendSelectedMemberInfo = function(id) {
    console.log('this is the grid id', id);
    dataService.assignActiveMemberId(id);
  };

  $scope.gridOptions = {
    columnDefs: [
           { field: 'first_name',
             cellTemplate: '<a ng-click="grid.appScope.sendSelectedMemberInfo(row.entity.pin)" ' +
             'href="#/individualDatacard">{{COL_FIELD}}</a>',
             sort: {
               direction: uiGridConstants.ASC,
               priority: 1
             }
           },
           { field: 'last_name',
              sort: {direction: uiGridConstants.ASC, priority: 2}},
           { field: 'email'},
           { field: 'phone'},
           {field: 'pin', visible: false}
         ],
    enableFullRowSelection: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  $scope.export = function () {
    console.log('csv export button was hit');
    $scope.gridApi.exporter.csvExport( 'visible', 'visible');
  };


    $timeout(function () {
       angular.element(document).find('nav').triggerHandler('click');
    }, 0);
}]);
