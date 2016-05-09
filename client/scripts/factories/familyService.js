app.factory('FamilyService', ['$http',function ($http) {
  var publicApi = {
  getFamilyIdByPin: getFamilyIdByPin,
  addToFamilyByPin: addToFamilyByPin
  };

  function getFamilyIdByPin(pin) {
    var params = {};
    params.pin = pin;
    console.log('getFamily pin param, ', params);
    return $http.get('/data/family/getFamilies', {params: params}).then(function (response) {
      console.log('family.get says: ', response.data);
      return response.data;
    });
  }

  function addToFamilyByPin(pin, familyId) {
    return $http.post('/data/family/addPeople', {pinArray: pin, familyId: familyId}).then(function (response) {
      console.log('familyService.addTFam says, ', response);
      return response.data;
    });
  }

  return publicApi;
}]);
