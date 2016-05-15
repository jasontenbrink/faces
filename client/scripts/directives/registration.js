app.directive('registration', ['$http', 'MemberService', function ($http, MemberService) {
  return {
    restrict: "E",
    scope: {
      nextPage: "&"
    },
    templateUrl: 'assets/views/directives/registration.html',
    link: link
  };
  function link(scope){
    var memberService = MemberService;
    scope.user = {email:"",
                  firstName:"",
                  lastName: "",
                  gender: "",
                  age: "",
                  electronic_newsletter: 'true'
                };
    scope.submitRegistration = function (form) {
      if (form.$valid) {
        memberService.postMember(scope.user).then(function (response) {
            scope.nextPage();
            scope.user = {};
            scope.submitForm.$setPristine(); //this isn't working 
            console.log('$setPristine should hav happened');
        });

      }
    };
  }
}]);
