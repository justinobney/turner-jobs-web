import styles from './index.css';
import template from './index.html';

function LoginDirective(){
  return {
    restrict: 'E',
    template: template,
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
