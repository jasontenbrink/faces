app.controller('LoginController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
  console.log('hi, from Login Controller');

  $scope.user = {};
  $scope.submitCredentials = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/login', $scope.user)
      .then(function (response) {
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

}]);
