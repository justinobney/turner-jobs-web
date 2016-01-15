import styles from './index.css';
import template from './index.html';

function HomeDirective(){
  return {
    restrict: 'E',
    template: template,
    controller: HomeController,
    controllerAs: 'home'
  }
}

function HomeController(api){
  const svc = this;

  svc.openings = [];

  init();

  function init(){
    api.getOpenings().then(
      resp => {
        svc.openings = resp.data;
      },
      error => {
        console.log(error);
      }
    );
  }
}

export default angular
  .module('turner-jobs-web.home', [])
  .directive('home', HomeDirective)
  .name;
