app.directive('joinFamily', ['$http', 'MemberService', function ($http, MemberService) {
  return {
    restrict: "E",
    scope: {

    },
    templateUrl: 'assets/views/directives/join-family.html',
    link: link
  };
  function link(scope){
    var memberService = MemberService;
    var suggestionArray = [];
    var dataArray = [];
    scope.people = [];

    memberService.getMembersByName().then(function(response){
      dataArray = response.data.sort(compare); //alphabetize

    });



    scope.addToFamily = function(person){
      console.log(person);
      //get persons family id
      //get registering persons id, then add it to family id
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
