//register new member wizard to clear out fields on next click.  
//get focus onto first name after 'register another member' is clicked

AdminController.$inject = ['$scope'];

export default function AdminController($scope){
  var wizardArray = ['profilePage', 'joinFamilyPage', 'addressPage', 'registrationFinished'];
  var activeIndex = 0;
  $scope.activePage = wizardArray[activeIndex];
  $scope.nextPage = function () {
    if (activeIndex < 3) activeIndex++;
    else activeIndex = 0;
    $scope.activePage = wizardArray[activeIndex];
  };
}