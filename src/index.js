// npm
import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
// screens
import login from './screens/login/index.js';
import home from './screens/home/index.js';
// services
import api from './services/api.js';
// style
import styles from 'index.css';

function AppDirective() {
  return {
    restrict: 'E',
    templateUrl: 'screens/app.html',
    controller: AppController,
    controllerAs: 'app'
  }
}

function AppController() {
  this.title = 'Angular Webpack Minimal Starter';
}

function ConfigService() {
  this.apiHeader = 'a185141c18dcbcd78c3d6f3d75f8e818';
}

function AppConfig($stateProvider, $urlRouterProvider, $httpProvider) {
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

  // alternatively, register the interceptor via an anonymous factory
  $httpProvider.interceptors.push(($q, config, $injector) => {
    return {
      request(requestConfig) {
          if (config.apiHeader) {
            requestConfig.headers['access_token'] = config.apiHeader;
          }
          return requestConfig;
        },
        responseError(rejectReason) {
          const $state = $injector.get('$state');
          $state.transitionTo('login');
          return $q.reject(rejectReason);
        }
    };
  });
}

const deps = [
  uibs,
  uiRouter,
  ngResource,
  login,
  home,
  api
];


angular.module('turner-jobs-web', deps)
  .directive('app', AppDirective)
  .service('config', ConfigService)
  .config();

angular.bootstrap(document, ['turner-jobs-web']);
