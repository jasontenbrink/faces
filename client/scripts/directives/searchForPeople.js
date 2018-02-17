searchForPeople.$inject = ['DataService', '$ngRedux']
export default function searchForPeople (DataService, $ngRedux) {
    return {
      restrict: 'E',
      scope: {
        searchResult: '='
      },
      templateUrl: 'assets/views/directives/search-for-people.html',
      link: function (scope, elements, attrs, controllers) {
        const unsubscribe = $ngRedux.connect( state => ({}))(scope);
        scope.$on('$destroy', unsubscribe);
        
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
              const people = dataService.peopleData();
              scope.searchResult = people;
              scope.dispatch({type: 'ADD_MEMBERS', value: people})
            });
            scope.toggle();
        };
        function SearchObject() {
          this.first_name='';
          this.last_name='';
          this.email='';
          this.phone='';
        }
        scope.fetchData(new SearchObject());
      }
    };
  }