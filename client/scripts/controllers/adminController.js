app.controller('AdminController', ['$scope', function($scope){
  var wizardArray = ['profilePage', 'joinFamilyPage', 'addressPage', 'registrationFinished'];
  var activeIndex = 0;
  $scope.activePage = wizardArray[activeIndex];
  $scope.nextPage = function () {
    if (activeIndex < 3) activeIndex++;
    else activeIndex = 0;
      //this isn't ideal.  Want to indicate that registration is complete and
      //member is saved and return to blank registration page
    $scope.activePage = wizardArray[activeIndex];
  };
}]);