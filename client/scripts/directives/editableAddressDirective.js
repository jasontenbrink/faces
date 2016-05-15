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
          if(scope.addressExists){
            console.log('working');
            addressService.updateAddress(scope.address).then(
              function (response) {
                scope.isDisabled = !scope.isDisabled;
              });
          }
          else{
            // scope.address.pin = memberService.getRegisteringMember().pin;
            scope.address.pin = 45;
            addressService.postAddress(scope.address).then(
              function (response) {
                console.log('success', response);
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
    }
  };
}]);
