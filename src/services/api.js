ApiService.$inject = ['$resource'];
function ApiService($resource){
  const BASE_URL = 'http://localhost:3000/v1';
  const Openings = $resource(`${BASE_URL}/openings`, {id:'@id'});
  const AccessTokens = $resource(`${BASE_URL}/access_tokens`);

  this.createOpening = createOpening;
  this.getOpenings = getOpenings
  this.login = login;

  function createOpening(opening){
    return Openings.save(opening).$promise;
  }

  function getOpenings(){
    return Openings.get().$promise;
  }

  function login({username, password}){
    const params = {
      grant_type:"password",
      username, password
    };

    return AccessTokens.save(params).$promise;
  }
}


export default angular
  .module('turner-jobs-web.services.api', [])
  .service('api', ApiService)
  .name;
