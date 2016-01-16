app.directive('searchForPeople',['DataService',
  function (DataService) {
    return {
      restrict: 'E',
      scope: {
        searchResult: '='
      },
      templateUrl: 'assets/views/directives/search-for-people.html',
      link: function (scope, elements, attrs, controllers) {
        scope.searchResult = [];
        scope.searchObject = new SearchObject();
        scope.initialShow = true;
        scope.onOrOff = false;

        scope.toggle = function () {
          scope.onOrOff = !scope.onOrOff;
          scope.initialShow = false;
        };

        var dataService = DataService;

        scope.fetchData = function(searchObject) {
          dataService.retrieveData(searchObject)
            .then(function () {
              scope.searchResult = dataService.peopleData();
            });
            scope.toggle();
        };
        function SearchObject() {
          this.first_name='';
          this.last_name='';
          this.email='';
          this.phone='';
        }
      }
    };
  }
]);
