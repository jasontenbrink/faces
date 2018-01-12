//register new member wizard to clear out fields on next click.  
//get focus onto first name after 'register another member' is clicked

AdminController.$inject = ['$scope'];

export default function AdminController($scope){
  var wizardArray = ['profilePage', 'joinFamilyPage', 'addressPage', 'registrationFinished'];
  $scope.activeIndex = 0;
  $scope.activePage = wizardArray[$scope.activeIndex];
  $scope.nextPage = function () {
    if ($scope.activeIndex < 3) $scope.activeIndex++;
    else $scope.activeIndex = 0;
    $scope.activePage = wizardArray[$scope.activeIndex];
  };
}