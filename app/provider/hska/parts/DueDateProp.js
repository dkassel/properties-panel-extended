'use strict';

var $ = require('jquery'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

require('jquery-ui');

module.exports = function (group) {

    group.entries.push(entryFactory.textField({
        id: 'dueDate',
        description: 'The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)',
        label: 'Due Date',
        modelProperty: 'dueDate'
    }));
}