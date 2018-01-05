DataService.$inject = ['$http', '$window', '$ngRedux'];
export default function DataService ($http, $window, $ngRedux) {
  var data;
  var individualData;
  var familyData;
  var activeMemberId;
  var activeFamilyId;
  
  $ngRedux.connect( state => ({}))(this);
  const DataService = this;

  var publicApi = {
    retrieveData: function (queryParams) {
      return getData(queryParams);
    },
    peopleData: function () {
      return data;
    },
    assignActiveFamilyIdApi: function (id) {
      return setActiveFamilyId(id);
    },
    assignActiveMemberId: function (id) {
      return setActiveMemberId(id);
    },
    retrieveActiveMemberId: function () {
      return getActiveMemberId();
    },
    retrieveActiveMember: function () {
      return getIndividualData(getActiveMemberId());
    },
    memberData: function () {
      return individualData;
    },
    retrieveFamilyData: function (id) {
      return getFamilyData(getActiveFamilyId());
    },
    familyData: function () {
      return familyData;
    }
  };

//getters
//======================================================

//getter for directory
  var getData = function (queryParams) {
  var promise = $http.get('/data',
    {params: queryParams}
  )
  .then(
    function (response) {
      data = response.data;
    }
  );
  return promise;
  };

//getter for individual data card
  var getIndividualData = function (id) {
  //  var member = getMember(id);
    var pinObject = {pin: id};

    var promise = $http.get('/data/individual',
      {params: pinObject}
    )
    .then(
      function (response) {
        individualData = response.data;
        DataService.dispatch({type: "ADD_MEMBER", value: individualData.individual});
        DataService.dispatch({type: "SET_SELECTED_MEMBER", value: individualData.individual.pin});
      }
    );
    return promise;
  };

  function getActiveMemberId() {
    activeMemberId = activeMemberId || $window.sessionStorage.getItem('activeMemberId');
    return activeMemberId;
  }

//getter for family data card
  var getFamilyData = function (id) {
    var queryParams = {family_id: id};
    var promise = $http.get('/data/family',
      {params: queryParams}
    )
    .then(
      function (response) {
        familyData = response.data;
      }
    );
    return promise;
  };

  function getActiveFamilyId() {
    activeFamilyId = activeFamilyId || $window.sessionStorage.getItem('activeFamilyId');
    return activeFamilyId;
  }

//setters
  var setActiveMemberId = function (id) {
    activeMemberId = id;
    $window.sessionStorage.setItem('activeMemberId', activeMemberId);
  };

  var setActiveFamilyId =function (id) {
    activeFamilyId = id;
    $window.sessionStorage.setItem('activeFamilyId', activeFamilyId);
  };

//utility
  var getMember = function (id) {
    //$$hashKey is a problem.  Can't use it.  Have to refactor directory controller using DB pin.
    var member;
    for (var i = 0; i < data.length; i++) {
      if (data[i].pin === id){
        member = data[i];
        return member;
      }
    }
  };

  return publicApi;
}
