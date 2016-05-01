app.factory('AddressService', ['$http',function ($http) {
  var publicApi = {
    getAddresses: getAddresses,
    updateAddress: updateAddress
  };

  function getAddresses() {

  }

  function updateAddress(params) {
    return $http.put('/address', params).then(function (response) {
      return response;
    });
  }

  return publicApi;
}]);
