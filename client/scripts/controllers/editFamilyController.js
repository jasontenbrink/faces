/*
to do: autoselect folks in the directory that are already in the family
deselect from directory if someone is removed from family using righthand pane
*/

app.controller('EditFamilyController', ['$scope', 'DataService', 'uiGridConstants', '$timeout', '$http',
function ($scope, DataService, uiGridConstants, $timeout, $http) {
  $scope.searchObject = new SearchObject();
  var searchResults;
  var dataService = DataService;
  var family = [];

  //get active family data
  if (dataService.familyData() === undefined){
    dataService.retrieveFamilyData().then(function (response) {
      $scope.family = dataService.familyData().family;
      $scope.people = dataService.familyData().people;
    });
  } else{
    console.log('dataService.familyData', dataService.familyData());
      $scope.family = dataService.familyData().family;
      $scope.people = dataService.familyData().people;
      console.log('resulting people in family from db, ', $scope.people);
      console.log('what is in the family object? ', $scope.family);
   }

   $scope.updateFamily = function () {
     var updateObject = {people: $scope.people,
                          family: $scope.family
                        };
     $http.post('/data/family/update', updateObject).
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

   $scope.getQuery = function () {
         console.log('heading out from controller', $scope.searchObject);
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

   //other helper functions
   $scope.removeFromFamily = function (pin) {
     for (var i = 0; i < $scope.people.length; i++) {
       if ($scope.people[i].pin === pin){
         $scope.people.splice(i,1);
       }
     }
   };

   $timeout(function () {
      angular.element(document).find('nav').triggerHandler('click');
   }, 0);

}]);

function SearchObject() {
  this.first_name='';
  this.last_name='';
  this.email='';
  this.phone='';
}

function isInFamily(array, dbId) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].pin === dbId) return true;
  }
  return false;
}
