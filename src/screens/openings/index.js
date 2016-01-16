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

OpeningsController.$inject = ['$uibModal', 'api']
function OpeningsController($uibModal, api){
  const openings = this;

  openings.list = [];
  openings.showEditOpening = showEditOpening;
  openings.showNewOpening = showNewOpening;

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

  function showNewOpening() {
    $uibModal.open({
      template: '<new-opening on-save="close(result)"></new-opening>',
      controller: ModalCtrl
    }).result
    .then(getOpenings);

    ModalCtrl.$inject = ['$scope', '$uibModalInstance'];
    function ModalCtrl($scope, $uibModalInstance){
      $scope.close = (result) => $uibModalInstance.close(result);
    }
  }

  function showEditOpening(opening) {
    $uibModal.open({
      template: `
        <edit-opening
          on-save="close(result)"
          opening="opening"></edit-opening>
      `,
      controller: ModalCtrl
    }).result
    .then(getOpenings);

    ModalCtrl.$inject = ['$scope', '$uibModalInstance'];
    function ModalCtrl($scope, $uibModalInstance){
      $scope.close = (result) => $uibModalInstance.close(result);
      $scope.opening = opening;
    }
  }

}

export default angular
  .module('turner-jobs-web.openings', [])
  .directive('openings', OpeningsDirective)
  .name;
