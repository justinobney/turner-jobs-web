function ApiService($resource){
  const BASE_URL = 'http://localhost:3000/v1';
  const Openings = $resource(`${BASE_URL}/openings`, {id:'@id'});

  this.getOpenings = getOpenings

  function getOpenings(){
    return Openings.get().$promise;
  }
}

export default angular
  .module('turner-jobs-web.services.api', [])
  .service('api', ApiService)
  .name;
