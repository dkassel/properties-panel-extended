'use strict';

var $ = require('jquery'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    cmdHelper    = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

require('jquery-ui');

var DELEGATE_TYPES = [
  'class',
  'expression',
  'delegateExpression'
];

var PROPERTIES = {
  class: 'camunda:class',
  expression: 'camunda:expression',
  delegateExpression: 'camunda:delegateExpression'
};

function isDelegate(type) {
  return DELEGATE_TYPES.indexOf(type) !== -1;
}

function getAttribute(type) {
  return PROPERTIES[type];
}

function getDelegationLabel(type) {
  switch(type) {
    case 'class':
        return 'Service';
    case 'expression':
        return 'Expression';
    case 'delegateExpression':
        return 'Delegate Expression';
    default:
        return '';
  }
}

module.exports = function(element, bpmnFactory, options) {

  var getImplementationType = options.getImplementationType,
      getBusinessObject     = options.getBusinessObject;

  var delegateEntry = entryFactory.textField({
    id: 'delegate',
    label: 'Value',
    dataValueLabel: 'delegationLabel',
    modelProperty: 'delegate',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var type = getImplementationType(element);
      var attr = getAttribute(type);
      var label = getDelegationLabel(type);
      return {
        delegate: bo.get(attr),
        delegationLabel: label
      };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var type = getImplementationType(element);
      var attr = getAttribute(type);
      var prop = {};
      prop[attr] = values.delegate || '';
      return cmdHelper.updateBusinessObject(element, bo, prop);
    },

    validate: function(element, values, node) {
      return isDelegate(getImplementationType(element)) && !values.delegate ? { delegate: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isDelegate(getImplementationType(element));
    }

  });

  $('#camunda-delegate').autocomplete({
    source:  [
        "Neuer Student anlegen",
        "Student exmatrikulieren",
        "Notenblatt generieren",
        "Zeugnis erstellen",
        "Belegung prüfen"
    ]
  });

  return [ delegateEntry ];

};
