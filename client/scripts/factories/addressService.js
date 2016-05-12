app.factory('AddressService', ['$http',function ($http) {
  var publicApi = {
    getPersonsAddresses: getPersonsAddresses,
    updateAddress: updateAddress,
    postAddress: postAddress,
    postPersonsAddress: postPersonsAddress
  };

  function getPersonsAddresses(params) {
    var searchParams = {params: params};
    return $http.get('/address/people_and_addresses', searchParams).then(function (response) {
      return response.data;
    });
  }

  function updateAddress(params) {
    return $http.put('/address', params).then(function (response) {
      return response;
    });
  }

  function postAddress(params) {
    return $http.post('/address', params).then(function (response) {
      return response;
    });
  }

  function postPersonsAddress(pin, address_id) {
    return $http.post('/address/people_and_addresses', {pin: pin, address_id: address_id}).
    then(function (response) {
      console.log('addressService postPersonsAddress says, ', response);
      return response;
    });
  }

  return publicApi;
}]);
