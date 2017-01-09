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
                console.log('Individual data card families', $scope.families);
                memberService.setRegisteringMember($scope.member); //eventually move away from dataService to memberService
                $scope.familyMembersAddresses = [];

                familyService.getMembersOfFamilies(families)
                .then(function(people){
                    return addressService.getFamilyMembersAddresses(people)
                })
                .then(function(addresses){
                    //remove dupes
                    var duplicateIndices = [];
                    for (var i=0; i < addresses.length; i++){
                        for (var j=0; j < $scope.addresses.length; j++){
                            if (addresses[i].address_id==$scope.addresses[j].address_id){
                                duplicateIndices.push(i);
                            }
                        }
                    }
                    //need to go backwards so that the order of the indices we haven't gotten
                    //to yet aren't messed up.
                    for (var k = duplicateIndices.length-1; k >= 0; k--){
                        addresses.splice(duplicateIndices[k],1);
                    }
                    $scope.familyMembersAddresses = addresses;
                });
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
    })
}]);
