profile.$inject = ['MemberService', '$ngRedux']

export default function profile (MemberService, $ngRedux){
  return {
    restrict: "E",
    scope: {
      member: '='
    },
    templateUrl: 'assets/views/directives/profile.html',
    link: function (scope) {
      const unsubscribe = $ngRedux.connect( state => ({user: state.user}))(scope);
      scope.$on('$destroy', unsubscribe);

      var memberService = MemberService;
      var tempUser = Object.assign({}, scope.member);
      scope.isDisabled = true;
      scope.submitRegistration = function (form) {
        if (form.$valid){
          memberService.updateMember(scope.member).then(
            function (response) {
              scope.isDisabled = !scope.isDisabled;
              console.log(tempUser.age);
            });
        }
      };

      scope.cancel = function(){
        Object.assign(scope.member, tempUser);
        scope.isDisabled = !scope.isDisabled;
      };
    }
  };
}
