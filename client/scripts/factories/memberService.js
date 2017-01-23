MemberService.$inject =  ['$http'];
export default function MemberService ($http) {
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
    return $http.put('/memberAdmin', params).then(function (response) {
      return response;
    });
  }

  function postMember(params) {
    return $http.post('/memberAdmin', params).then(function (response) {
      registeringMember = response.data;
      console.log('memberService registeringMember, ', registeringMember);
      return registeringMember;
    });
  }

  function getMembersByName(params) {
    return $http.get('/memberAdmin', params).then(function (response) {
      return response;
    });
  }

  function getRegisteringMember() {
    return registeringMember;
  }

  function deleteMember(id) {
    return $http.delete('/memberAdmin', {params:{id: id}}).then(function (response) {
      console.log('from delete member', response);
      return response.data[0][0].pin;
    });
  }

  function setRegisteringMember(member) {
    registeringMember = member;
    return registeringMember;
  }
  return publicApi;
}