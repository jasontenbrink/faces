app.factory('AddressService', ['$q', '$http', function ($q, $http) {
  var publicApi = {
    getPersonsAddresses: getPersonsAddresses,
    updateAddress: updateAddress,
    postAddress: postAddress,
    postPersonsAddress: postPersonsAddress,
    getFamilyMembersAddresses: getFamilyMembersAddresses,
    removeAddressesExistingInAnotherArray: removeAddressesExistingInAnotherArray
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

  function getFamilyMembersAddresses(person){
    //change person to an array
    var promises = [];
    for (var i=0; i < person.length; i++){
      console.log('getFamilyMembersAddresses person[i]', person[i]);
      promises.push($http.get('/data/individual', {params: person[i]}))
    }
    return $q.all(promises)
    .then(function(response){
      var addresses = [];

      //flatten addresses
      for (var i = 0; i < response.length; i++){
        addresses = addresses.concat(response[i].data.addresses);
      }

      //remove dupes
      for (var i=0; i < addresses.length; i++){
        for (var j=i; j < addresses.length; j++){
          if (addresses[i].address_id==addresses[j].address_id && i!=j){
            addresses.splice(j,1);
          }
        }
      }
      console.log('concat method', addresses); 
      return addresses;
    }).catch(function(response){
      console.log('err in addressService.getFamilyMembersAddresses', response);
    });
  }

  function removeAddressesExistingInAnotherArray(addresses, referenceAddresses){ //candidate for memoization
    return addresses.reduce(function (total, value){
        var isDuplicate = referenceAddresses.find(function (val){
            return value.address_id == val.address_id
        });
        isDuplicate ? null : total.push(value);
        return total;
    }, []);
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
