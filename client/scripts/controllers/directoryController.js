app.controller('DirectoryController',['$scope', 'DataService', 'uiGridConstants','$timeout', '$mdDialog',
function ($scope, DataService, uiGridConstants, $timeout, $mdDialog) {
console.log('hi from DirectoryController');
  var dataService = DataService;

  $scope.sendSelectedMemberInfo = function(id) {
    console.log('this is the grid id', id);
    dataService.assignActiveMemberId(id);
  };

  $scope.gridOptions = {
    columnDefs: [
           { field: 'first_name',
             displayName: 'First Name',
             cellTemplate: '<a ng-click="grid.appScope.sendSelectedMemberInfo(row.entity.pin)" ' +
             'href="#/individualDatacard">{{COL_FIELD}}</a>',
             sort: {
               direction: uiGridConstants.ASC,
               priority: 1
             }
           },
           { field: 'last_name',
             displayName: 'Last Name',
              sort: {direction: uiGridConstants.ASC, priority: 2}
           },
           { field: 'email',
             displayName: 'Email',
           },
           { field: 'phone',
             displayName: 'Phone Number',
           },
           { field: 'gender',
             displayName: 'Gender',
             visible: false
           },
           { field: 'age',
             displayName: 'Age',
             visible: false
           },
           { field: 'electronic_newsletter',
             displayName: 'Electronic Newsletter',
           },
           {field: 'pin', visible: false} //pin needs to be last
         ],
    enableFullRowSelection: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  //sets default display values
  $scope.isActive = [true, true, true, true, false, false, true];

  //show or hide columns in the ui grid
  $scope.toggleVisible = function (colNumber) {
    //$scope.isActive[colNumber] = !$scope.isActive[colNumber];
    $scope.gridOptions.columnDefs[colNumber].visible = !$scope.isActive[colNumber];

    // $scope.gridOptions.columnDefs[colNumber].visible = !($scope.gridOptions.columnDefs[colNumber].visible);
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    console.log('isActive', $scope.isActive[colNumber]);
  };

  $scope.openDialogue = function ($event) {
    var parentEl = angular.element(document.body);
    console.log('parentEl', angular.element(document));
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      scope: $scope,
      clickOutsideToClose: true,
      preserveScope: true,
      templateUrl: 'assets/views/directives/column-options-modal.html'
    });
  };

  $scope.export = function () {
    console.log('csv export button was hit');
    $scope.gridApi.exporter.csvExport( 'visible', 'visible');
  };

//I think I put this in to automatically trigger a click when I was debugging
    $timeout(function () {
       angular.element(document).find('nav').triggerHandler('click');
    }, 0);
}]);
