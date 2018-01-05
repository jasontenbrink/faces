UserProfileService.$inject =  ['$http', '$ngRedux'];
export default function UserProfileService ($http, $ngRedux) {
    $ngRedux.connect( state => ({}))(this);
    const UserProfileService = this;

  const profile = {
      role: "",
      email: "",
      firstName: "",
      lastName: "",
      tenantId: -1,
      pin: null
  };
  
  return {
    fetchProfile(){
        return $http.get('/profile')
        .then( res => {
            profile.role = parseInt(res.data.role, 10);
            profile.email = res.data.username;
            profile.firstName = res.data.first_name;
            profile.lastName = res.data.last_name;
            profile.tenantId = res.data.tenant_id;
            profile.addressId = res.data.address_id;
            profile.pin = res.data.pin;

            UserProfileService.dispatch({type: "SET_USER", value: profile});
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