FamilyService.$inject = ['$http', '$q']

export default function FamilyService ($http, $q) {
  var publicApi = {
  getFamilyIdByPin: getFamilyIdByPin,
  addToFamilyByPin: addToFamilyByPin,
  makeFamily: makeFamily,
  getMembersOfFamilies: getMembersOfFamilies
  };

  function getFamilyIdByPin(pin) {
    var params = {};
    params.pin = pin;
    return $http.get('/data/family/getFamilies', {params: params}).then(function (response) {
      return response.data;
    });
  }

  function addToFamilyByPin(pin, familyId) {
    return $http.post('/data/family/addPeople', {pinArray: pin, familyId: familyId}).then(function (response) {
      return response.data;
    });
  }

  function makeFamily (people){
    return $http.post('/data/family', people).then(
      function(response){
        return response.data;
      }
    );
  }

  function getMembersOfFamilies(familyIds){
    var promises = [];
    angular.forEach(familyIds, function(familyId){
      promises.push($http.get('/data/family/getFamilyMembers', {params: familyId}));
    });
    return $q.all(promises)
    .then(function(response){
      return response[0].data;
    })
    .catch(function(err){
    }); 
  }
  return publicApi;
}
