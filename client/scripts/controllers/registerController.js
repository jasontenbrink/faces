app.controller('RegisterController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
  console.log('hi, from UserRegistrationController');
  $scope.user={};

  $scope.submitRegistration = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/register', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        if (response.status===200){
          $location.path('/login');
        }

      });
  };


}]);
