// npm
import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

// screens
import login from './screens/login/index.js';
import openings from './screens/openings/index.js';

// components
import newOpening from './components/new-opening.js'
import editOpening from './components/edit-opening.js'

// services
import api from './services/api.js';
import authInterceptor from './services/auth-interceptor.js';

// style
import styles from 'index.css';

// app template
import appTemplate from './screens/app.html';

function AppDirective() {
  return {
    restrict: 'E',
    template: appTemplate
  }
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
function AppConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('root', {
      url: '/',
      template: '<openings></openings>'
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });

  $httpProvider.interceptors.push(authInterceptor);
}

const deps = [
  uibs,
  uiRouter,
  ngResource,
  login,
  openings,
  newOpening,
  editOpening,
  api
];


angular.module('turner-jobs-web', deps)
  .directive('app', AppDirective)
  .value('config', {apiHeader: 'a8c6ce46db5297e6ef6abc7bb56c1b12'})
  .config(AppConfig);

angular.bootstrap(document, ['turner-jobs-web']);
