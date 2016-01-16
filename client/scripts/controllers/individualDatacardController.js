app.controller('IndividualDatacardController', ['$scope', 'DataService',
function ($scope, DataService) {
  $scope.x = 'hi!';
  $scope.columnWidth = 20;
  $scope.columnSpacing = '3';
  var dataService = DataService;
  var data;
  dataService.retrieveActiveMember()
  .then(function () {
      data =  dataService.memberData();
      $scope.member = dataService.memberData().individual;
      $scope.addresses = dataService.memberData().addresses;
      $scope.families = dataService.memberData().families;
      console.log('from inside indvcontr',data);
    });

    $scope.updateActiveFamilyId = function (id) {
      dataService.assignActiveFamilyIdApi(id);
    };

}]);
