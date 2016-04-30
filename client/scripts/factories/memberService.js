app.factory('MemberService', ['$http',function ($http) {
  var publicApi = {
    postMember: updateMember
  };

  function updateMember(params) {
    return $http.put('/postMemberAdmin', params).then(function (response) {
      return response;
    });
  }
  return publicApi;
}]);
