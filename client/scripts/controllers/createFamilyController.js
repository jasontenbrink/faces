/*
to do: autoselect folks in the directory that are already in the family
deselect from directory if someone is removed from family using righthand pane
*/

app.controller('CreateFamilyController', ['$scope', 'uiGridConstants', '$http',
function ($scope, uiGridConstants, $http) {
  var searchResults;
  $scope.people = [];

   $scope.createFamily = function () {
     var updateObject =  $scope.people;
     $http.post('/data/family', updateObject).
       then(function (response) {
         console.log('response after making a family: ', response.data);
       });
   };

   //functions and options required for ui-grid/individual directory
   $scope.gridOptions = {
     columnDefs: [
            { field: 'first_name',
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
       console.log('object to be inserted into the family: ',row.entity);
       if (row.isSelected && !(isInFamily($scope.people, row.entity.pin)) ){
         $scope.people.push(row.entity);
       }else{
         $scope.removeFromFamily(row.entity.pin);
       }
       //todo if person is no longer in family array, deselect on the grid
       console.log(msg);
     });
   };

   //other helper functions
   $scope.removeFromFamily = function (pin) {
     for (var i = 0; i < $scope.people.length; i++) {
       if ($scope.people[i].pin === pin){
         $scope.people.splice(i,1);
       }
     }
   };

   function isInFamily(array, dbId) {
     for (var i = 0; i < array.length; i++) {
       if (array[i].pin === dbId) return true;
     }
     return false;
   }
}]);