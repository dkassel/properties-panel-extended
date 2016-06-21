'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    hskaFieldFactory = require('../factory/HskaFieldFactory');


function createDynamicHskaFieldsForParameters(parameters, group) {
  var name;

  parameters.forEach(function(parameter) {
    name = parameter.name || '';

    if(name.indexOf(hskaFieldFactory.hskaPrefix) >= 0) {
      group.entries.push(hskaFieldFactory.create(parameter));
    }
  });
}

function createDynamicHskaGroup(businessObj, group) {
  var extensionElements = businessObj.get('bpmn:extensionElements'),
      values;

  if(extensionElements) {
    values = extensionElements.get('bpmn:values') || [];
    values.forEach(function(moddleElement) {
      if(moddleElement.inputParameters) {
        createDynamicHskaFieldsForParameters(moddleElement.inputParameters, group);
      }
      if(moddleElement.outputParameters) {
        createDynamicHskaFieldsForParameters(moddleElement.outputParameters, group);
      }
    });
  }
}

module.exports = function(group, element, bpmnFactory) {

  var businessObject = getBusinessObject(element);

  createDynamicHskaGroup(businessObject, group);

};