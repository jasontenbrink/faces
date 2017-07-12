UserProfileService.$inject =  ['$http'];
export default function UserProfileService ($http) {
  const profile = {
      role: "",
      email: "",
      firstName: "",
      lastName: "",
      tenantId: -1
  };
  
  return {
    fetchProfile(){
        return $http.get('/profile')
        .then( res => {
            profile.role = parseInt(res.data.role, 10);
            profile.email = res.data.email;
            profile.firstName = res.data.first_name;
            profile.lastName = res.data.last_name;
            profile.tenantId = res.data.tenantId;
            return profile;
        })
        .catch( err => console.log(err));
    },
    getProfile(){
        return profile;
    }
    //TO DO add /profile route on the backend.
  };

}