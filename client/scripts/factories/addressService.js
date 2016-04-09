app.factory('AddressService', ['$http',function ($http) {
  var publicApi = {
    getAddresses: getAddresses,
    postAddress: postAddress
  };

  function getAddresses() {

  }

  function postAddress(params) {
    return $http.post('/address/update', params).then(function (response) {
      return response;
    });
  }
  return publicApi;
}]);
