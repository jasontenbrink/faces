LoginController.$inject = ['$scope', '$http', '$location', '$timeout']
  export default function LoginController($scope, $http, $location, $timeout) {
    $scope.isLoggingIn = false;
    $scope.user = {};
    $scope.isError = false;

    $scope.submitCredentials = function () {
      $scope.isLoggingIn = true;
      $http.post('/login', $scope.user)
      .then((response) =>{
        $scope.isLoggingIn = false;
        $location.path('/directory');
      })
      .catch((err)=> {
        $scope.isLoggingIn = false;
        $scope.isError = true;
        // $timeout($scope.resetForm, 2000);
      });
    };

    $scope.resetForm = ()=>{
      $scope.isError = false;
    }
  }