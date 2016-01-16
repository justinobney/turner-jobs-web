import template from './edit-opening.html';

function EditOpeningDirective(){
  return {
    restrict: 'E',
    scope: {
      onSave: '&',
      opening: '='
    },
    template: template,
    controller: EditOpeningController,
    controllerAs: 'editOpening',
    bindToController: true
  }
}

EditOpeningController.$inject = ['api'];
function EditOpeningController(api){
  Object.assign(this, this.opening)
  const editOpening = this;

  editOpening.craftCodes = [
    'Boilermaker',
    'Welder',
    'Pipefitter',
    'Helper',
    'Firewatch'
  ];

  editOpening.cancel = cancel;
  editOpening.save = save;

  function cancel(){
    editOpening.onSave({result:null})
  }

  function save(){
    const opening = {
      id: editOpening.id,
      craft: editOpening.craft,
      location: editOpening.location,
      description: editOpening.description,
      contact_name: editOpening.contact_name,
      contact_number: editOpening.contact_number,
      is_closed: editOpening.is_closed
    }

    api.updateOpening(opening.id, opening)
      .then(
        resp => {
          editOpening.onSave({result:resp.data})
        },
        error => {
          editOpening.error = error.data.meta.error.details;
        }
      );
  }
}

export default angular
  .module('turner-jobs-web.edit-opening', [])
  .directive('editOpening', EditOpeningDirective)
  .name;
