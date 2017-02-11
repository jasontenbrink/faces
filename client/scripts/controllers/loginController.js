LoginController.$inject = ['$scope', '$http', '$location']
  export default function LoginController($scope, $http, $location) {
    $scope.isLoggingIn = false;
    $scope.user = {};
    $scope.submitCredentials = function () {
      $scope.isLoggingIn = true;
      console.log('data sent to server', $scope.user);
      $http.post('/login', $scope.user)
        .then(function (response) {
          $scope.isLoggingIn = false;
          //console.log('is this html?', response.data);
          console.log('response is', response);
          //console.log('response status', response.status);
          if (response.status===200){
            $location.path('/directory');
          }
          else{
            // $location.path('/failure');
            alert('sign in failed');
          }

        });
    };
  }