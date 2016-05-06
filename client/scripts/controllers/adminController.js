app.controller('AdminController', ['$scope', function($scope){
  var wizardArray = ['profilePage', 'joinFamilyPage', 'addressPage'];
  var activeIndex = 1;
  $scope.activePage = wizardArray[activeIndex];
  $scope.nextPage = function () {
    if (activeIndex < 2) activeIndex++;
    else activeIndex = 0;
      //this isn't ideal.  Want to indicate that registration is complete and
      //member is saved and return to blank registration page
    $scope.activePage = wizardArray[activeIndex];
  };
  console.log('AdminController');
}]);
