'use strict';

var $ = require('jquery'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

require('jquery-ui');

module.exports = function (group, element) {
    if (is(element, 'camunda:Assignable')) {

        var assignee = entryFactory.textField({
            id: 'assignee',
            description: 'Assignee of the User Task',
            label: 'Assignee',
            modelProperty: 'assignee'
        });

       assignee.html = '<label for="camunda-assignee" >Assignee</label><div class="ui-front pp-field-wrapper" ><input id="camunda-assignee" type="text" name="assignee"  /><button class="clear" data-action="clear" data-show="canClear" ><span>X</span></button></div>';

        $(function () {

            $("#camunda-assignee").autocomplete({
                source:  function (request, response) {
                    $.ajax({
                        url: "http://test-cdn.abas.de/hska/bpmn/users?q=" + request.term,
                        success: function (data) {
                            var transformed = $.map(data.user_service.users, function (el) {
                                return {
                                    label: el.name,
                                    id: el.id
                                };
                            });

                            response(transformed);
                        },
                        error: function () {
                            response([]);
                        }
                    });
                }
            });
        });


        // Assignee
        group.entries.push(assignee);

        // Candidate Users
        group.entries.push(entryFactory.textField({
            id: 'candidateUsers',
            description: 'A list of candidates for this User Task',
            label: 'Candidate Users',
            modelProperty: 'candidateUsers'
        }));

        // Candidate Groups
        group.entries.push(entryFactory.textField({
            id: 'candidateGroups',
            description: 'A list of candidate groups for this User Task',
            label: 'Candidate Groups',
            modelProperty: 'candidateGroups'
        }));

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

        // priority
        group.entries.push(entryFactory.textField({
            id: 'priority',
            description: 'Priority of this User Task',
            label: 'Priority',
            modelProperty: 'priority'
        }));
    }
};