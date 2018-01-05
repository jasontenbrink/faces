editableAddress.$inject = ['AddressService', 'MemberService', '$ngRedux']
export default function editableAddress (AddressService, MemberService, $ngRedux){
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
      const unsubscribe = $ngRedux.connect( state => ({
        selectedMemberPin: state.selectedMember,
        user: state.user
      }))(scope);
      scope.$on('$destroy', unsubscribe);
      scope.dispatch({type: "CRAZY_ACTION", value: scope.selectedMember});

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
            addressService.updateAddress({...scope.address, pin: scope.selectedMemberPin}).then(
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
}