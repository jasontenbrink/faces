import ActiveMemberService from './activeMemberService.js'
import AddressService from './addressService.js'
import AuthenticationRedirectInjector from './authenticationRedirectInjector.js'
import DataService from './dataFactory.js'
import FamilyService from './familyService.js'
import MemberService from './memberService.js'

export default ()=>{
    angular.module('app').factory('ActiveMemberService', ActiveMemberService)
                         .factory('AddressService', AddressService)
                         .factory('AuthenticationRedirectInjector', AuthenticationRedirectInjector)
                         .factory('DataService', DataService)
                         .factory('FamilyService', FamilyService)
                         .factory('MemberService', MemberService);
}