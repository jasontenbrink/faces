app.directive('registration', ['$http', 'MemberService', function ($http, MemberService) {
  return {
    restrict: "E",
    scope: {

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
      if (form.$valid) memberService.postMember(scope.user);
    };
    // var address = {};
    // var addressService = AddressService;
    // var memberService = MemberService;
    // scope.submitRegistration = function(){
    //   memberService.updateMember(user).then(
    //     function (response) {
    //       addressService.postAddress(user).then(
    //         function (response) {
    //           console.log(response);
    //         });
    //     });
    //
    // };
  }
}]);
