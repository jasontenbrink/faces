app.directive('editableAddress', ['AddressService', 'MemberService', function(AddressService, MemberService){
  return {
    restrict: "E",
    scope: {
      address: '=',
      isDisabled: '=',
      addressExists: '=',
      nextPage: "&"
    },
    templateUrl: 'assets/views/directives/editable-address.html',
    link: function (scope) {
      var addressService = AddressService;
      var memberService = MemberService;
      var tempAddress = Object.assign({}, scope.address);
      console.log('address obj: ', scope.address);

      scope.submitRegistration = function (form) {
        if (form.$valid){
          if(scope.addressExists){ //then its an address update
            console.log('working');
            addressService.updateAddress(scope.address).then(
              function (response) {
                scope.isDisabled = !scope.isDisabled;
              });
          }
          else{ //its putting in a brand new address
            scope.address.pin = memberService.getRegisteringMember().pin;

            //addressService should return a resolved promise if there is no payload on scope.address
            addressService.postAddress(scope.address).then(
              function (response) {
                console.log('success from address service', response);
                scope.$emit('submitAddressForm');
                scope.nextPage();
              });
          }
        }
      };

      scope.cancel = function(){
        if(scope.addressExists){
          Object.assign(scope.address, tempAddress);
          scope.isDisabled = !scope.isDisabled;
          scope.$emit('submitAddressForm');
        }
        else{
          scope.nextPage();
          scope.$emit('submitAddressForm');
        }
      };

      scope.skipAddress = function(){
        scope.nextPage();
        scope.$emit('submitAddressForm');
      }
    }
  };
}]);
