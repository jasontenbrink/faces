FamilyDatacardController.$inject = ['$scope', 'DataService']

export default function FamilyDatacardController ($scope, DataService) {
  var searchResults;
  var dataService = DataService;

  $scope.updateActiveMemberId = function (id) {
   dataService.assignActiveMemberId(id);
  };

  dataService.retrieveFamilyData()
   .then(function () {
        $scope.family = dataService.familyData().family;
        $scope.people = dataService.familyData().people;
   });
}
