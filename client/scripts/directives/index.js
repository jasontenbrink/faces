import addAddressFromFamily from './addAddressFromFamily.js'
import createFamily from './createFamilyDirective.js'
import displayMember from './displayMembers.js'
import editableAddress from './editableAddressDirective.js'
import joinFamily from './joinFamilyDirective.js'
import profile from './profile.directive.js'
import registration from './registration.js'
import searchForPeople from './searchForPeople.js'



    angular.module('app').directive('addAddressFromFamily', addAddressFromFamily)
                         .directive('createFamily', createFamily)
                         .directive('displayMember', displayMember)
                         .directive('editableAddress', editableAddress)
                         .directive('joinFamily', joinFamily)
                         .directive('profile', profile)
                         .directive('registration', registration)
                         .directive('searchForPeople', searchForPeople)
