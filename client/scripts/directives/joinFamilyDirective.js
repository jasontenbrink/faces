app.directive('joinFamily', ['$http', 'MemberService', 'FamilyService',
function ($http, MemberService, FamilyService) {
  return {
    restrict: "E",
    scope: {

    },
    templateUrl: 'assets/views/directives/join-family.html',
    link: link
  };
  function link(scope){
    var memberService = MemberService;
    var familyService = FamilyService;
    var suggestionArray = [];
    var dataArray = [];
    scope.people = [];
    scope.familyIsAdded = false;

    memberService.getMembersByName().then(function(response){
      dataArray = response.data.sort(compare); //alphabetize

    });

    scope.addToFamily = function(person){
      scope.registeringMember = memberService.getRegisteringMember();
      console.log('registeringMember, ', scope.registeringMember);

      //get persons family id
      familyService.getFamilyIdByPin(person.pin).then(function (response) {
        var registeringMemberPin = [ //endpoint expects array of objects with property 'pin'
            {pin: scope.registeringMember.pin}
          ];
        // var registeringMemberPin = [{pin: 49}];

        console.log('response from get FamilyIdByPin', response);
        //get registering persons id, then add it to family id.
        //ToDo, create modal where registering member can choose which family if person has more than 1
        familyService.addToFamilyByPin(registeringMemberPin, response[0].family_id).then(
          function (res) {
            console.log(res);
            scope.familyIsAdded = true;
          }
        );
      });
    };
    scope.updateSearch = function () {
      if (scope.searchText.length > 0){
        suggestionArray = [];
        for (var i = 0; i < dataArray.length; i++) {
          if( angular.lowercase(dataArray[i].last_name).indexOf(angular.lowercase(scope.searchText)) === 0){
            // suggestionArray.push(dataArray[i].last_name + ', ' + dataArray[i].first_name);
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
}]);
