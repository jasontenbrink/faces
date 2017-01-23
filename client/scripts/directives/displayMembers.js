displayMember.$inject = ['uiGridConstants']

export default function displayMember () {
    return {
      restrict: 'E',
      scope: {
        gridOptions: '=',
        data: '='
      },
      templateUrl: 'assets/views/directives/display-members.html'
    };
}
