import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';

import login from './screens/login/index.js';
import home from './screens/home/index.js';

import styles  from 'index.css';

function AppDirective(){
  return {
    restrict: 'E',
    templateUrl: 'screens/app.html',
    controller: AppController,
    controllerAs: 'app'
  }
}

class AppController {
  constructor() {
    this.title = 'Angular Webpack Minimal Starter';
  }
}

const deps = [
  uibs,
  uirouter,
  login,
  home
];

angular.module('turner-jobs-web', deps)
  .directive('app', AppDirective)
  .config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('root', {
        url: '/home',
        template: '<home></home>'
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      });
  });

angular.bootstrap(document, ['turner-jobs-web']);
