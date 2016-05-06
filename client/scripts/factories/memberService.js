app.factory('MemberService', ['$http',function ($http) {
  var publicApi = {
    postMember: updateMember,
    getMembersByName: getMembersByName,
    getRegisteringMemberId: getRegisteringMemberId
  };

  var registeringMemberId = -1;

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

  function getRegisteringMemberId() {
    return registeringMemberId;
  }
  return publicApi;
}]);
