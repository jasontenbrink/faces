app.directive('editableAddress', ['AddressService', function(AddressService){
  return {
    restrict: "E",
    scope: {
      address: '='
    },
    templateUrl: 'assets/views/directives/editable-address.html',
    link: function (scope) {
      var addressService = AddressService;
      var tempAddress = Object.assign({}, scope.address);
      console.log('address obj: ', scope.address);
      scope.isDisabled = true;
      
      scope.submitRegistration = function (form) {
        if (form.$valid){
          addressService.updateAddress(scope.address).then(
            function (response) {
              scope.isDisabled = !scope.isDisabled;
            });
        }
      };

      scope.cancel = function(){
        Object.assign(scope.address, tempAddress);
        scope.isDisabled = !scope.isDisabled;
      };
    }
  };
}]);
