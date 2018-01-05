MakeFamiliesController.$inject = ['$scope', 'DataService', 'uiGridConstants','$timeout', '$http']
export default function MakeFamiliesController ($scope, DataService, uiGridConstants, $timeout, $http) {

  $scope.searchObject = new SearchObject();
  $scope.searchResults = [];
  $scope.family = [];
  var dataService = DataService;

  $scope.sendSelectedMemberInfo = function(id) {
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
    enableFullRowSelection: true
  };

  $scope.gridOptions.onRegisterApi = function(gridApi){
  //set gridApi on scope
  $scope.gridApi = gridApi;
  gridApi.selection.on.rowSelectionChanged($scope,function(row){
      var msg = 'row selected ' + row.isSelected;
      if (row.isSelected){
        $scope.family.push(row.entity);
      }else{
        $scope.removeFromFamily(row.entity.pin);
      }
      //todo if person is no longer in family array, deselect on the grid
    });
  };

  $scope.removeFromFamily = function (pin) {
    for (var i = 0; i < $scope.family.length; i++) {
      if ($scope.family[i].pin === pin){
        $scope.family.splice(i,1);
      }
    }
  };

  $scope.getQuery = function () {
      //  if (dataService.peopleData() === undefined){
          dataService.retrieveData($scope.searchObject)
          .then(function () {
            $scope.searchResults = dataService.peopleData();
            $scope.gridOptions.data = $scope.searchResults;
          });
      //  }
        // else{
        //   $scope.searchResults = dataService.peopleData();
        // }
    };

    $scope.makeFamily = function () {
      $http.post('/data/family', $scope.family).
        then(function (response) {
        });
    };
    $timeout(function () {
       angular.element(document).find('nav').triggerHandler('click');
    }, 0);
}

function SearchObject() {
  this.first_name='';
  this.last_name='';
  this.email='';
  this.phone='';
}
