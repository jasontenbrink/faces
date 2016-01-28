app.controller('NavController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    $scope.logout = function () {
      console.log('logout button');
      $http.get('/logout').then(function (response) {
        console.log('logout response', response);
        $location.path('/login');
      });
    };

  }]);
