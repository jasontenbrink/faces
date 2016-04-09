app.directive('registration', ['$http', function ($http) {
  return {
    restrict: "E",
    scope: {

    },
    templateUrl: 'assets/views/directives/registration.html',
    link: link
  };
  function link(scope){
    scope.user = {email:"",
                  firstName:"",
                  lastName: "",
                  gender: "",
                  age: "",
                  electronic_newsletter: 'true'
                };
    scope.submitRegistration = function () {
      console.log('heading out on postMemberAdmin');
      $http.post('/postMemberAdmin', scope.user).then(
        function (response) {
          console.log(response);
        });
    };
    // var address = {};
    // var addressService = AddressService;
    // var memberService = MemberService;
    // scope.submitRegistration = function(){
    //   memberService.postMember(user).then(
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
