app.controller('IndividualDatacardController', ['$scope', 'DataService', 'MemberService',
function ($scope, DataService, MemberService) {
  $scope.x = 'hi!';
  $scope.columnWidth = 20;
  $scope.columnSpacing = '3';
  $scope.addNewAddress = true;
  var dataService = DataService;
  var memberService = MemberService;
  var data;
  dataService.retrieveActiveMember()
  .then(function () {
      data =  dataService.memberData();
      $scope.member = dataService.memberData().individual;
      $scope.addresses = dataService.memberData().addresses;
      $scope.families = dataService.memberData().families;
      memberService.setRegisteringMember($scope.member); //eventually move away from dataService to memberService
    });

    $scope.updateActiveFamilyId = function (id) {
      dataService.assignActiveFamilyIdApi(id);
    };


    $scope.data = {
        selectedIndex: 0,
    };
    $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

}]);
