import htmlString from '../../views/directives/account-management.html'

accountManagement.$inject = ['$http']

export default function accountManagement($http){
    return {
        restrict: "E",
        template: htmlString,
        scope: {
            user: "="
        },
        link(scope){
            scope.password = 'hi mom';
            console.log('what the fuck')
            scope.updatePassword = () => {
                console.log('update password', scope.password);
                $http.put('/passwordManagement', {
                    password: scope.password, 
                    pin: scope.user.pin
                })
                .then (res => console.log(res));
            };
        }
    }
}