app.directive('addAddressFromFamily', ['AddressService', 'MemberService', 'FamilyService',
function(AddressService, MemberService, FamilyService){
  return {
    restrict: "E",
    scope: {
      nextPage: "&",
      reload: "&",
      familysAddresses: "="
    },
    templateUrl: 'assets/views/directives/add-address-from-family.html',
    link: function (scope) {
      var familyService = FamilyService;
      var addressService = AddressService;
      var memberService = MemberService;

      scope.$watch(memberService.getRegisteringMember, function(member){
        familyService.getMembersOfFamilies(member.families)
          .then(function(people){
              return addressService.getFamilyMembersAddresses(people)
          })
          .then(function(addresses){
              scope.familysAddresses = 
                addressService.removeAddressesExistingInAnotherArray(addresses, member.addresses);
          });
      }, true);

      scope.addAddress = function (){
        var member = memberService.getRegisteringMember();
        addressService.postPersonsAddress(member.pin, this.address.address_id)
        .then(function(res){
          scope.$emit('addAddressFromFamily'); 
          scope.reload();
        })        
      }
    }
  };
}]);
