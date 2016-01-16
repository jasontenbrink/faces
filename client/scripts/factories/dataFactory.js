app.factory('DataService', ['$http', function ($http) {
  var data;
  var individualData;
  var familyData;
  var activeMemberId = 2;
  var activeFamilyId = 3;

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
      return activeMemberId;
    },
    retrieveActiveMember: function () {
      return getIndividualData(activeMemberId);
    },
    memberData: function () {
      return individualData;
    },
    retrieveFamilyData: function (id) {
      return getFamilyData(activeFamilyId);
    },
    familyData: function () {
      return familyData;
    }
  };

//getters
//======================================================

//getter for directory
  

//getter for individual data card
  var getIndividualData = function (id) {
  //  var member = getMember(id);
    var pinObject = {pin: id};

    console.log('heading out from factory on /data/individual: ', id);
    var promise = $http.get('/data/individual',
      {params: pinObject}
    )
    .then(
      function (response) {
        console.log('response from server', response.data);
        individualData = response.data;
      }
    );
    return promise;
  };

//getter for family data card
  var getFamilyData = function (id) {
    var queryParams = {family_id: id};
    console.log('heading out from factory on /data/family.  family_id: ', queryParams );
    var promise = $http.get('/data/family',
      {params: queryParams}
    )
    .then(
      function (response) {
        console.log('response from server', response.data);
        familyData = response.data;
      }
    );
    return promise;
  };

//setters
  var setActiveMemberId = function (id) {
    console.log('from factory, setting member id to: ', id);
    activeMemberId = id;
  };

  var setActiveFamilyId =function (id) {
    console.log('from factory, setting family id to: ', id);
    activeFamilyId = id;
  };

//utility
  var getMember = function (id) {
    //$$hashKey is a problem.  Can't use it.  Have to refactor directory controller using DB pin.
    var member;
    console.log('in factory getMember, data is: ', data);
    console.log('in factory getMember, id is: ', id);
    for (var i = 0; i < data.length; i++) {
      if (data[i].pin === id){
        member = data[i];
        console.log('active memberId from factory', activeMemberId);
        return member;
      }
    }
  };

  return publicApi;
}]);
