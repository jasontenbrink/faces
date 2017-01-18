app.directive('editableAddress', ['AddressService', 'MemberService', function(AddressService, MemberService){
  return {
    restrict: "E",
    scope: {
      address: '=',
      isDisabled: '=',
      addressExists: '=',
      nextPage: "&",
      reload: "&"
    },
    templateUrl: 'assets/views/directives/editable-address.html',
    link: function (scope) {
      var addressService = AddressService;
      var memberService = MemberService;
      var tempAddress = Object.assign({}, scope.address);

      scope.nextPageWrapper = function (){
        scope.address = {};
        scope.nextPage();
      }

      scope.submitRegistration = function (form) {
        if (form.$valid){
          if(scope.addressExists){ //then its an address update
            addressService.updateAddress(scope.address).then(
              function (response) {
                scope.isDisabled = !scope.isDisabled;
                scope.reload();
              });
          }
          else{ //its putting in a brand new address
            scope.address.pin = memberService.getRegisteringMember().pin;

            //addressService should return a resolved promise if there is no payload on scope.address
            addressService.postAddress(scope.address).then(
              function (response) {
                scope.$emit('submitAddressForm');
                scope.reload();
                scope.nextPageWrapper();
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
          scope.nextPageWrapper();
          scope.$emit('submitAddressForm');
        }
      };

      scope.skipAddress = function(){
        scope.nextPageWrapper();
        scope.$emit('submitAddressForm');
      }
    }
  };
}]);
