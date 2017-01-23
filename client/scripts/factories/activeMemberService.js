ActiveMemberService.$inject =  ['$http', '$q']
export default function ActiveMemberService ($http, $q) {
  var publicApi = {
  setActiveMember: setActiveMember,
  getActiveMember: getActiveMember
  };

  var activeMember = {};

  function setActiveMember(member) {
    activeMember = member;
  }

  function getActiveMember (){
    return activeMember;
  }

  return publicApi;
}