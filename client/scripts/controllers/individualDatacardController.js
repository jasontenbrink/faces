app.controller('IndividualDatacardController', 
['$scope', 'DataService', 'MemberService', 'FamilyService', 'AddressService', '$q',
function ($scope, DataService, MemberService, FamilyService, AddressService, $q) {
  $scope.columnWidth = 20;
  $scope.columnSpacing = '3';
  $scope.addNewAddress = false;
  $scope.familyMembersAddresses = [];
  $scope.familyMembersAddressToBeAdded = {};

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

                var member = Object.assign(data.individual, {families: families}, {addresses: data.addresses});
                memberService.setRegisteringMember(member); //eventually move away from dataService to memberService
                $scope.familyMembersAddresses = [];
            }
        );
    }
    $scope.activate();

    $scope.determineWhichAddressWizardToShow = function(){
        if($scope.familyMembersAddresses.length > 0){
             $scope.isAddingFamilyAddress = !$scope.isAddingFamilyAddress;
        }
        else $scope.addNewAddress = !$scope.addNewAddress;
    }

    $scope.$on('submitAddressForm', function(event, args){
        $scope.addNewAddress = !$scope.addNewAddress;
    })

    $scope.$on('addAddressFromFamily', function(event, args){
        $scope.addNewAddress = false;
        $scope.isAddingFamilyAddress = false;
    });
}]);
