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

export default AuthInterceptor;
