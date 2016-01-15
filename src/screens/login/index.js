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

function LoginController(api, config, $state){

  this.authenticate = authenticate;

  function authenticate(username, password){
    api.login({username, password})
      .then(
        resp => {
          if(resp.meta.error){
            alert(resp.meta.error);
          } else {
            config.apiHeader = resp.data[0].access_token;
            $state.transitionTo('root');
          }
        }
      );
  }
}

export default angular
  .module('turner-jobs-web.login', [])
  .directive('login', LoginDirective)
  .name;
