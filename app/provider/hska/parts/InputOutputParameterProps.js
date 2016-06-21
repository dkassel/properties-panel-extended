'use strict';

var inputOutputParameter = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/InputOutputParameter');

var assign = require('lodash/object/assign');

module.exports = function(group, element, bpmnFactory, options) {

  group.entries = group.entries.concat(inputOutputParameter(element, bpmnFactory, assign({}, options)));

};
