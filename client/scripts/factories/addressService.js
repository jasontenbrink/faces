app.factory('AddressService', ['$q', '$http', function ($q, $http) {
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
    //if (isAddressEmpty()) return $q.when('no address to save');

    return $http.post('/address', params).then(function (response) {
      return response;
    });
  }


//I think the current problem is hear.  remove pin: pin and make it just pin.
  function postPersonsAddress(pin, address_id) {
    return $http.post('/address/people_and_addresses', {pin: pin, address_id: address_id}).
    then(function (response) {
      console.log('addressService postPersonsAddress says, ', response);
      return response;
    });
  }

  return publicApi;

///////Private/////////////////
  function isAddressEmpty(address){
    var isEmpty = true;
    for (key in address){
      console.log('key is, ' + key + '. value is, ' + address[key])
      if (key !== 'pin'){
        if(address[key]){
          isEmpty = false;
          return isEmpty;
        }
      }
    }
    return isEmpty;
  }
}]);
