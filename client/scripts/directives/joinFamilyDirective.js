joinFamily.$inject = ['$http', 'MemberService', 'FamilyService', 'AddressService']

export default function joinFamily ($http, MemberService, FamilyService, AddressService) {
  return {
    restrict: "E",
    scope: {
      nextPage: "&",
    },
    templateUrl: 'assets/views/directives/join-family.html',
    link: link
  };
  function link(scope){
    var memberService = MemberService;
    var familyService = FamilyService;
    var addressService = AddressService;

    activate();

    function activate(){
      var suggestionArray = [];
      var dataArray = [];
      scope.people = [];
      scope.selectedPerson = {};
      scope.familyIsAdded = false;
      scope.familyMembersAddressDoesNotExist = false;
      scope.familyIsAdded = false;
      scope.addressIsAdded = false;
      getAllMembers();
    }

    scope.nextPageWrapper = function(){
      activate();
      scope.nextPage();
    };

    function getAllMembers(){
    memberService.getMembersByName().then(function(response){
      dataArray = response.data.sort(compare); //alphabetize

    });
  }

    //add registering member to selected member's family
    scope.addToFamily = function(){
      scope.registeringMember = memberService.getRegisteringMember();

      //get persons family id
      familyService.getFamilyIdByPin(scope.selectedPerson.pin).then(function (response) {
        var registeringMemberPin = [ //endpoint expects array of objects with property 'pin'
            {pin: scope.registeringMember.pin}
          ];

        //if member has no family make a family of one
        if (response.length < 1){
          familyService.makeFamily([scope.selectedPerson, scope.registeringMember]).then(
            function(family){
              scope.familyIsAdded = true;
            }
          )
        }
        else{
          //TODO, create modal where registering member can choose which family if scope.selectedPerson has more than 1
          familyService.addToFamilyByPin(registeringMemberPin, response[0].family_id).then(
            function (res) {
              scope.familyIsAdded = true;
            }
          );
        }


      });
    };

    //add selected persons address to registering members address
    scope.addAddress = function () {
      //this directive loads when the admin view loads, so no registeringMember yet
      //better choice is to use routing for this register member wizard.
      var registeringMember = MemberService.getRegisteringMember();
      if(!scope.selectedPerson) return console.log('no selected person');

      addressService.getPersonsAddresses(scope.selectedPerson).then(function (response) {
        console.log('joinFamilyDirective from getPersonsAddresses', response[0]);
        if (response[0]){
          addressService.postPersonsAddress(registeringMember.pin, response[0].address_id).
            then(function (res) {
              scope.addressIsAdded = true;
              scope.nextPage();
              scope.nextPageWrapper();
              console.log(res);
              return res;
            });
        } else{
          scope.familyMembersAddressDoesNotExist = true;
        }
      });
    };

    scope.updateSearch = function () {
      if (scope.searchText.length > 0){
        suggestionArray = [];
        scope.people = [];
        for (var i = 0; i < dataArray.length; i++) {
          if( angular.lowercase(dataArray[i].last_name).indexOf(angular.lowercase(scope.searchText)) === 0){
            suggestionArray.push(dataArray[i]);
          }
          if (suggestionArray.length === 5) {
              break;
            }
        }
        if (suggestionArray.length > 0) {
          scope.people = suggestionArray;
          console.log('s', scope.people);
        }
      }
    };

    function compare(a,b) {
      if (a.last_name < b.last_name)
        return -1;
      else if (a.last_name > b.last_name)
        return 1;
      else
        return 0;
    }
  }
}
