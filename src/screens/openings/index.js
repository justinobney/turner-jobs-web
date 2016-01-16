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
  openings.open = open;

  init();

  function init(){
    api.getOpenings().then(
      resp => openings.list = resp.data,
      error => console.log(error)
    );
  }

  function open() {
    var modalInstance = $uibModal.open({
      template: 'Foo',
      controller: ($uibModalInstance) => {
        this.close = () => $uibModalInstance.close();
      }
    });

    modalInstance.result.then(
      (selectedItem) => {
        $scope.selected = selectedItem;
      }, error => {
        $log.info('Modal dismissed at: ' + new Date());
      }
    );
  }

}

export default angular
  .module('turner-jobs-web.openings', [])
  .directive('openings', OpeningsDirective)
  .name;
