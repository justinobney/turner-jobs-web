import styles from './index.css';

function HomeDirective(){
  return {
    restrict: 'E',
    templateUrl: 'screens/home/index.html',
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
