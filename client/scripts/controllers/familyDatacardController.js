app.controller('FamilyDatacardController', ['$scope', 'DataService',
function ($scope, DataService) {
  var searchResults;
  var dataService = DataService;

  $scope.updateActiveMemberId = function (id) {
    console.log('from familyDC, set active memberID to:', id);
   dataService.assignActiveMemberId(id);
  };

  dataService.retrieveFamilyData()
   .then(function () {
        $scope.family = dataService.familyData().family;
        $scope.people = dataService.familyData().people;
        console.log('resulting people in family from db, ', $scope.people);
   });




}]);
