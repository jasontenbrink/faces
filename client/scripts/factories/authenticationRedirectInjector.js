import { setTimeout } from "timers";

AuthenticationRedirectInjector.$inject = ['$location', '$ngRedux']
export default function AuthenticationRedirectInjector ($location, $ngRedux){
  
  // $ngRedux.connect(()=>{{}})(this);  
  var authenticationRedirect = {
            responseError: function (response) {
              switch( response.status){
                case 401: window.location.reload(); break;
                case 403: {
                  $ngRedux.dispatch({type: "403_ERROR", value: true});
                  setTimeout(()=>{
                    $ngRedux.dispatch({type: "403_ERROR", value: false});
                  }, 2000)
                  break;
                }
                default: return Promise.reject(response);
              }
              // if (response.status===401 || response.status == 403){
              //   $ngRedux.dispatch({type: "AUTH_ACTION"})
              //   window.location.reload();
              //   // put in timer and display an error that the server isn't working.
              //   // separate out 401 behavior from 403 behavior.  403 dispatches action, 401 refreshes
              // }
              // else{
              //   return Promise.reject(response);
              // }
            }
          };
  return authenticationRedirect;
}
