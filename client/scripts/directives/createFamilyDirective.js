createFamily.$inject = ['AddressService']
export default function createFamily (AddressService){
  return {
    restrict: "E",
    scope: {
      address: '='
    },
    templateUrl: 'assets/views/directives/create-family.html',
    controller: 'CreateFamilyController'
  };
}