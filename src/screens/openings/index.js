import styles from './index.css';
import template from './index.html';

function OpeningsDirective(){
  return {
    restrict: 'E',
    template: template,
    controller: OpeningsController,
    controllerAs: 'openings'
  }
}

function OpeningsController($uibModal, api){
  const openings = this;

  openings.list = [];
  openings.openNewOpeningView = openNewOpeningView;

  init();

  function init(){
    getOpenings()
  }

  function getOpenings(){
    api.getOpenings().then(
      resp => openings.list = resp.data,
      error => console.log(error)
    );
  }

  function openNewOpeningView() {
    var modalInstance = $uibModal.open({
      template: '<new-opening fn-close="close(result)"></new-opening>',
      controller: ($scope, $uibModalInstance) => {
        $scope.close = (result) => $uibModalInstance.close(result);
      }
    });

    modalInstance.result.then(getOpenings);
  }

}

export default angular
  .module('turner-jobs-web.openings', [])
  .directive('openings', OpeningsDirective)
  .name;
