IndividualDatacardController.$inject = ['$scope', 'DataService', 'MemberService', 'FamilyService', 'AddressService', '$q', '$ngRedux']

export default function IndividualDatacardController ($scope, DataService, MemberService, FamilyService, AddressService, $q, $ngRedux) {
  $scope.columnWidth = 20;
  $scope.columnSpacing = '3';
  $scope.addNewAddress = false;
  $scope.familyMembersAddresses = [];
  $scope.familyMembersAddressToBeAdded = {};
  $scope.member = {};

  var dataService = DataService;
  var memberService = MemberService;
  var familyService = FamilyService;
  var data;
  var addressService = AddressService

//   const connectStoreToController = $ngRedux.connect(mapStateToThis)
//   const unsubscribe = connectStoreToController(this);
//   $scope.$on('unsubscribe', unsubscibe);

  const unsubscribe = $ngRedux.connect( state => ({
      updateRole: state.updateRole,
      selectedMemberPin: state.selectedMember,
      user: state.user
  }))($scope);
//   $scope.user = this.user;
//   $scope.selecedMemberPin = this.
  $scope.$on('$destroy', unsubscribe);
  console.log("datacard controller this",this);
  

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
}
