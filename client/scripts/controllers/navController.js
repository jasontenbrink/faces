NavController.$inject = ['$scope', '$http', '$location', '$window']

export default function NavController ($scope, $http, $location, $window) {
    $scope.logout = function () {
      console.log('logout button');
      $http.get('/logout').then(function (response) {
        console.log('logout response', response);
        // $location.path('/login');
        $window.location.assign('/');
      });
    };
}
