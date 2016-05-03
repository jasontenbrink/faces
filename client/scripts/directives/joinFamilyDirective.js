app.directive('joinFamily', ['$http', function ($http) {
  return {
    restrict: "E",
    scope: {

    },
    templateUrl: 'assets/views/directives/join-family.html',
    link: link
  };
  function link(scope){
    scope.people = ['john', 'ringo'];
    scope.logToConsole = function(param){
      console.log(param);
    };

  }
}]);
