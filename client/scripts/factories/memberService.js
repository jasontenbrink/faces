app.factory('MemberService', ['$http',function ($http) {
  var publicApi = {
    updateMember: updateMember,
    postMember: postMember,
    getMembersByName: getMembersByName,
    getRegisteringMember: getRegisteringMember,
    setRegisteringMember: setRegisteringMember,
    deleteMember: deleteMember
  };

  var registeringMember = {};

  function updateMember(params) {
    return $http.put('/member', params).then(function (response) {
      return response;
    });
  }

  function postMember(params) {
    return $http.post('/member', params).then(function (response) {
      registeringMember = response.data;
      console.log('memberService registeringMember, ', registeringMember);
      return registeringMember;
    });
  }

  function getMembersByName(params) {
    return $http.get('/member', params).then(function (response) {
      return response;
    });
  }

  function getRegisteringMember() {
    return registeringMember;
  }

  function deleteMember(id) {

  }

  function setRegisteringMember(member) {
    registeringMember = member;
    return registeringMember;
  }
  return publicApi;
}]);
