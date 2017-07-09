import ActiveMemberService from './activeMemberService.js'
import AddressService from './addressService.js'
import AuthenticationRedirectInjector from './authenticationRedirectInjector.js'
import DataService from './dataFactory.js'
import FamilyService from './familyService.js'
import MemberService from './memberService.js'
import UserProfileService from './userProfileService.js'


    angular.module('app').factory('ActiveMemberService', ActiveMemberService)
                         .factory('AddressService', AddressService)
                         .factory('AuthenticationRedirectInjector', AuthenticationRedirectInjector)
                         .factory('DataService', DataService)
                         .factory('FamilyService', FamilyService)
                         .factory('UserProfileService', UserProfileService)
                         .factory('MemberService', MemberService);
