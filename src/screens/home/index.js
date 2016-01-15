import styles from './index.css';

function HomeDirective(){
  return {
    restrict: 'E',
    templateUrl: 'screens/home/index.html',
    controller: HomeController,
    controllerAs: 'home'
  }
}

class HomeController {
  constructor() {
  }
}

export default angular
  .module('turner-jobs-web.home', [])
  .directive('home', HomeDirective)
  .name;
