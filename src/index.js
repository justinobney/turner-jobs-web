// npm
import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
// screens
import login from './screens/login/index.js';
import openings from './screens/openings/index.js';
import newOpening from './screens/openings/new-opening.js'
import editOpening from './screens/openings/edit-opening.js'
// services
import api from './services/api.js';
// style
import styles from 'index.css';
import template from './screens/app.html';

function AppDirective() {
  return {
    restrict: 'E',
    template: template,
    controller: AppController,
    controllerAs: 'app'
  }
}

function AppController() {}

function ConfigService() {
  this.apiHeader = 'a8c6ce46db5297e6ef6abc7bb56c1b12';
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

  $httpProvider.interceptors.push(AuthInterceptor);
}

AuthInterceptor.$inject = ['$q', 'config', '$injector'];
function AuthInterceptor($q, config, $injector) {
  return {
    request(requestConfig) {
        if (config.apiHeader) {
          requestConfig.headers['access_token'] = config.apiHeader;
        }
        return requestConfig;
      },
      responseError(rejectReason) {
        if(rejectReason.status === 401){
          const $state = $injector.get('$state');
          $state.transitionTo('login');
        }
        return $q.reject(rejectReason);
      }
  };
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
  .service('config', ConfigService)
  .config(AppConfig);

angular.bootstrap(document, ['turner-jobs-web']);
