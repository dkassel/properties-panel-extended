'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(group, element, bpmnFactory) {

  // HsKA
  var entry = entryFactory.textArea({
    id: 'hska',
    description: '',
    label: 'HsKA',
    modelProperty: 'hska'
  });

  entry.set = function(element, values) {
    var businessObject = getBusinessObject(element),
        newObjectList = [];

    if (typeof values.hska !== 'undefined' && values.hska !== '') {
      newObjectList.push(bpmnFactory.create('bpmn:HsKA', {
        text: values.hska
      }));
    }

    return cmdHelper.setList(element, businessObject, 'hska', newObjectList);
  };

  entry.get = function(element) {
    var businessObject = getBusinessObject(element),
        hskas = businessObject.get('hska'),
        text = '';

    if(Array.isArray(hskas)) {
      text = hskas[0].text;
    }

    return { hska: text };
  };

  group.entries.push(entry);
};