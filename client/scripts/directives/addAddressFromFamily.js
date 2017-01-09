app.directive('addAddressFromFamily', ['AddressService', 'MemberService', 'FamilyService',
function(AddressService, MemberService, FamilyService){
  return {
    restrict: "E",
    scope: {
      nextPage: "&",
      reload: "&",
      familysAddresses: "=",
      memberPin: "@"
    },
    templateUrl: 'assets/views/directives/add-address-from-family.html',
    link: function (scope) {
      var familyService = FamilyService;
      var addressService = AddressService;
      var memberService = MemberService;
      scope.addAddress = function (){
        addressService.postPersonsAddress(scope.memberPin, this.address.address_id)
        .then(function(res){
          scope.$emit('addAddressFromFamily'); 
          scope.reload();
        })        
      }
    }
  };
}]);
