app.directive('addAddressFromFamily', ['AddressService', 'MemberService', 'FamilyService',
function(AddressService, MemberService, FamilyService){
  return {
    restrict: "E",
    scope: {
      nextPage: "&",
      reload: "&",
      families: "="
    },
    templateUrl: 'assets/views/directives/add-address-from-family.html',
    link: function (scope) {
      //use that to get pins of family members and get their addresses
        //in progress.  have a call in familyService set up, but I need to make sure the service works


      //display those addresses
      //make those addresses buttons.
      //If an address is clicked, do a confirmation box, then write the address to the DB, call nextPage()
      //have a create new address button.  This will call nextPage().

      var addressService = AddressService;
      var memberService = MemberService,
          familyService = FamilyService;

      var tempAddress = Object.assign({}, scope.address);
      console.log('address obj: ', scope.address);

      scope.submitRegistration = function (form) {
        if (form.$valid){
          if(scope.addressExists){
            console.log('working');
            addressService.updateAddress(scope.address).then(
              function (response) {
                scope.isDisabled = !scope.isDisabled;
              });
          }
          else{
            scope.address.pin = memberService.getRegisteringMember().pin;

            //addressService should return a resolved promise if there is no payload on scope.address
            addressService.postAddress(scope.address).then(
              function (response) {
                console.log('success from address service', response);
                scope.nextPage();
              });
          }
        }
      };

      scope.cancel = function(){
        if(scope.addressExists){
          Object.assign(scope.address, tempAddress);
          scope.isDisabled = !scope.isDisabled;
        }
        else{
          scope.nextPage();
        }
      };

      scope.skipAddress = function(){
        scope.nextPage();
      }
    }
  };
}]);
