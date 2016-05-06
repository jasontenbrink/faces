app.factory('MemberService', ['$http',function ($http) {
  var publicApi = {
    postMember: updateMember,
    getMembersByName: getMembersByName
  };

  function updateMember(params) {
    return $http.put('/member', params).then(function (response) {
      return response;
    });
  }

  function getMembersByName(params) {
    return $http.get('/member', params).then(function (response) {
      return response;
    });
  }
  return publicApi;
}]);
