'use strict';

var $ = require('jquery'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

//extended usertask properties
var assigneeProb = require('./AssigneeProb'),
    candidateUsersProb  = require('./CandidateUsersProb'),
    candidateGroupsProb  = require('./CandidateGroupsProb'),
    priorityProb  = require('./PriorityProb');

require('jquery-ui');

module.exports = function (group, element, bpmnFactory) {
    if (is(element, 'camunda:Assignable')) {
        
        assigneeProb(group, element, bpmnFactory);
        candidateUsersProb(group, element, bpmnFactory);
        candidateGroupsProb(group, element, bpmnFactory);

        // Due Date
        group.entries.push(entryFactory.textField({
            id: 'dueDate',
            description: 'The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)',
            label: 'Due Date',
            modelProperty: 'dueDate'
        }));

        // FollowUp Date
        group.entries.push(entryFactory.textField({
            id: 'followUpDate',
            description: 'The follow up date as an EL expression (e.g. ${someDate} or an ' +
            'ISO date (e.g. 2015-06-26T09:54:00)',
            label: 'Follow Up Date',
            modelProperty: 'followUpDate'
        }));

        priorityProb(group, element, bpmnFactory);

    }
};