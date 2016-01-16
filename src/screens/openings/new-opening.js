import template from './new-opening.html';

function NewOpeningDirective(){
  return {
    restrict: 'E',
    scope: {
      fnClose: '&'
    },
    template: template,
    controller: NewOpeningController,
    controllerAs: 'newOpening',
    bindToController: true
  }
}

NewOpeningController.$inject = ['api'];
function NewOpeningController(api){
  const newOpening = this;

  newOpening.craftCodes = [
    'Boilermaker',
    'Welder',
    'Pipefitter',
    'Helper',
    'Firewatch'
  ];

  newOpening.cancel = cancel;
  newOpening.save = save;

  function cancel(){
    newOpening.fnClose({result:null})
  }

  function save(){
    const opening = {
      craft: newOpening.craft,
      location: newOpening.location,
      description: newOpening.description,
      contact_name: newOpening.contact_name,
      contact_number: newOpening.contact_number,
      is_closed: newOpening.is_closed
    }

    api.createOpening(opening)
      .then(
        resp => {
          newOpening.fnClose({result:resp.data})
        },
        error => {
          newOpening.error = error.data.meta.error.details;
        }
      );
  }
}

export default angular
  .module('turner-jobs-web.new-opening', [])
  .directive('newOpening', NewOpeningDirective)
  .name;
