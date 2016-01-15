import styles from './index.css';

function LoginDirective(){
  return {
    restrict: 'E',
    templateUrl: 'screens/login/index.html',
    controller: LoginController,
    controllerAs: 'login'
  }
}

class LoginController {
  constructor() {
  }
}

export default angular
  .module('turner-jobs-web.login', [])
  .directive('login', LoginDirective)
  .name;
