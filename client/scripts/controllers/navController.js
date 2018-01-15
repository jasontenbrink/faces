NavController.$inject = ['$scope', '$http', '$location', '$window', '$ngRedux']

export default function NavController ($scope, $http, $location, $window, $ngRedux) {
  const unsubscribe = $ngRedux.connect( state => ({
    updateRole: state.updateRole,
    user: state.user,
    networkError: state.networkError
  }))($scope);  
  $scope.$on('$destroy', unsubscribe);

  $scope.toggle =true;
  
  // $scope.userRole = this.user.role;
  $scope.dispatch({type: "ZZZZZZ"})
  console.log('nav this', this);
  console.log('nav scope', $scope);
  $scope.logout = function () {
      $http.get('/logout').then(function (response) {
        // $location.path('/login');
        $window.location.assign('/');
      });
    };
    
  setTimeout(()=>{
    document.getElementById('groupsButton').click();
  }, 0)
    
}
