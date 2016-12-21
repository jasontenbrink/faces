app.controller('IndividualDatacardController', 
['$scope', 'DataService', 'MemberService', 'FamilyService', 'AddressService', '$q',
function ($scope, DataService, MemberService, FamilyService, AddressService, $q) {
  $scope.columnWidth = 20;
  $scope.columnSpacing = '3';
  $scope.addNewAddress = true;
  $scope.familyMembersAddresses = [];
  var dataService = DataService;
  var memberService = MemberService;
  var familyService = FamilyService;
  var data;
  var addressService = AddressService
  

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
    $scope.nextPage = function(){
        console.log('nextPage');
    }

    $scope.activate = function(){
        dataService.retrieveActiveMember().then(
            function () {
                data =  dataService.memberData();
                $scope.member = dataService.memberData().individual;
                $scope.addresses = dataService.memberData().addresses;
                var families = dataService.memberData().families;
                $scope.families = families;
                console.log('Individual data card families', $scope.families);
                memberService.setRegisteringMember($scope.member); //eventually move away from dataService to memberService
                $scope.familyMembersAddresses = [];

                familyService.getMembersOfFamilies(families)
                .then(function(people){
                    return addressService.getFamilyMembersAddresses(people)
                })
                .then(function(addresses){
                    $scope.familyMembersAddresses = addresses;
                });
            }
        );
    }
    $scope.activate();
}]);
