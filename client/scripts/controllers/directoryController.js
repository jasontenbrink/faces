app.controller('DirectoryController',['$scope', 'DataService', 'uiGridConstants','$timeout', '$mdDialog', 'MemberService',
function ($scope, DataService, uiGridConstants, $timeout, $mdDialog, MemberService) {
  var dataService = DataService;
  var memberService = MemberService; //I got sick of using dataService because it is too bulky

  $scope.sendSelectedMemberInfo = function(id) {
    dataService.assignActiveMemberId(id);
  };

  $scope.deleteMember = function (id) {
    if(confirm("are you sure you want to delete " + id)){
      memberService.deleteMember(id)
        .then(function (pin) {
          var people = $scope.gridOptions.data;
          for (var i = 0; i < people.length; i++) {
            if(people[i].pin == pin){
              $scope.gridOptions.data.splice(i,1);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  };

  $scope.gridOptions = {
    columnDefs: [
           { field: 'first_name',
             displayName: 'First Name',
             cellTemplate: '<a ng-click="grid.appScope.sendSelectedMemberInfo(row.entity.pin)" ' +
             'href="#/individualDatacard">{{COL_FIELD}}</a>',
             enableCellEdit: true,
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
           { field: 'gender',
             displayName: 'Gender',
            //  editableCellTemplate: 'ui-grid/dropDownEditor',
            //  editDropDownValueLabel: 'gender',
            //  editDropDownOptionsArray: [
            //    {id: 1, gender: 'male'},
            //    {id: 2, gender: 'female'}
            //  ],
             enableCellEdit: true,
             visible: true
           },
           { field: 'age',
             displayName: 'Age',
             visible: false
           },
           { field: 'electronic_newsletter',
             displayName: 'Electronic Newsletter',
             type: 'boolean'
           },
           { field: 'primary_phone_number',
             displayName: '1st Phone Number'
           },
           { field: 'secondary_phone_number',
             displayName: '2nd Phone Number'
           },
           { field: 'admin_notes',
             displayName: 'Administrator Notes',
             cellTooltip: true,
             visible: true
           },
           { field: 'delete button',
             displayName: ' ',
             cellTemplate: '<i ng-click="grid.appScope.deleteMember(row.entity.pin)" class="material-icons" style="color: rgb(104, 152, 233); cursor: pointer">delete</i>',
             visible: true
           },
           {field: 'pin', visible: false} //pin needs to be last
         ],
    enableFullRowSelection: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
            memberService.updateMember({
              pin: rowEntity.pin,
              last_name: rowEntity.last_name,
              first_name: rowEntity.first_name,
              electronic_newsletter: rowEntity.electronic_newsletter,
              gender: rowEntity.gender,
              admin_notes: rowEntity.admin_notes,
              age: rowEntity.age,
              email: rowEntity.email,
              primary_phone_number: rowEntity.primary_phone_number,
              secondary_phone_number: rowEntity.secondary_phone_number
            }).then (function(response){

            });
          });
    }
  };

  //sets default display values
  $scope.isActive = [true, true, true, true, false, true, true, true, true, false];

  //show or hide columns in the ui grid
  $scope.toggleVisible = function (colNumber) {
    $scope.gridOptions.columnDefs[colNumber].visible = !$scope.isActive[colNumber];
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };

//modal for choosing which columns to hide
  $scope.openDialogue = function ($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      scope: $scope,
      clickOutsideToClose: true,
      preserveScope: true,
      templateUrl: 'assets/views/directives/column-options-modal.html'
    });
  };

//export to csv
  $scope.export = function () {
    $scope.gridApi.exporter.csvExport( 'visible', 'visible');
  };

//I think I put this in to automatically trigger a click when I was debugging
    // $timeout(function () {
    //    angular.element(document).find('nav').triggerHandler('click');
    // }, 0);
}]);
