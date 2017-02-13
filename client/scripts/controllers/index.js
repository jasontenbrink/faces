import DirectoryController from './directoryController.js'
import AdminController from './adminController.js'
import CreateFamilyController from './createFamilyController.js'
import EditFamilyController from './editFamilyController.js'
import FamilyDatacardController from './familyDatacardController.js'
import IndividualDatacardController from './individualDatacardController'
import LoginController from './loginController.js'
import MakeFamiliesController from './makeFamiliesController.js'
import NavController from './navController.js'
import RegisterController from './registerController.js'

    angular.module('app').controller('DirectoryController', DirectoryController)
                         .controller('AdminController', AdminController)
                         .controller('CreateFamilyController', CreateFamilyController)
                         .controller('EditFamilyController', EditFamilyController)
                         .controller('FamilyDatacardController', FamilyDatacardController)
                         .controller('IndividualDatacardController', IndividualDatacardController)
                         .controller('LoginController', LoginController)
                         .controller('MakeFamiliesController', MakeFamiliesController)
                         .controller('NavController', NavController)
                         .controller('RegisterController', RegisterController)