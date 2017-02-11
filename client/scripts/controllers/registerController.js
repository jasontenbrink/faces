RegisterController.$inject = ['$scope', '$http', '$location']
export default function RegisterController ($scope, $http, $location) {
  $scope.user={};

  $scope.submitRegistration = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/register', $scope.user)
      .then(function (response) {
        console.log('response is', response);
        if (response.status===200){
          $location.path('/login');
        }
      });
  };
}
