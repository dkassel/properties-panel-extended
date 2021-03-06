'use strict';

var $ = require('jquery'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

require('jquery-ui');

module.exports = function (group, element, bpmnFactory) {

    group.entries.push(entryFactory.textField({
        id: 'priority',
        description: 'Priority of this User Task',
        label: 'Priority',
        modelProperty: 'priority'
    }));

    var prioritySelektor = $("#camunda-priority");
    prioritySelektor.autocomplete({
        source:  ["low","normal","high"]
    });
}