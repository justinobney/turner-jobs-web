ApiService.$inject = ['$resource'];
function ApiService($resource){
  const BASE_URL = 'http://localhost:3000/v1';
  const UPDATE = {'update': { method:'PUT' }};
  const Openings = $resource(`${BASE_URL}/openings/:id`, {id:'@id'}, UPDATE);
  const AccessTokens = $resource(`${BASE_URL}/access_tokens`);

  this.getOpenings = getOpenings
  this.createOpening = createOpening;
  this.updateOpening = updateOpening;

  this.login = login;

  function getOpenings(){
    return Openings.get().$promise;
  }

  function createOpening(opening){
    return Openings.save(opening).$promise;
  }

  function updateOpening(id, props){
    const params = {id, ...props}
    return Openings.update(params).$promise;
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
