profile.$inject = ['MemberService']

export default function profile (MemberService){
  return {
    restrict: "E",
    scope: {
      user: '='
    },
    templateUrl: 'assets/views/directives/profile.html',
    link: function (scope) {
      var memberService = MemberService;
      var tempUser = Object.assign({}, scope.user);
      scope.isDisabled = true;
      scope.submitRegistration = function (form) {
        if (form.$valid){
          memberService.updateMember(scope.user).then(
            function (response) {
              scope.isDisabled = !scope.isDisabled;
              console.log(tempUser.age);
            });
        }
      };

      scope.cancel = function(){
        Object.assign(scope.user, tempUser);
        scope.isDisabled = !scope.isDisabled;
      };
    }
  };
}
