'use strict';

var $ = require('jquery'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

require('jquery-ui');

module.exports = function (group, element, bpmnFactory) {

    function split( val ) {
        return val.split( /;\s*/ );
    }
    function splitKomma( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        return split( term ).pop();
    }
    
        
    group.entries.push(entryFactory.textField({
        id: 'assignee',
        description: 'Assignee of the User Task',
        label: 'Assignee',
        modelProperty: 'assignee'
    }));

    $("#camunda-assignee").autocomplete({
        source:  function (request, response) {
            $.ajax({
                url: "http://test-cdn.abas.de/hska/bpmn/users?q=" + request.term,
                success: function (data) {
                    var transformed = $.map(data.user_service.users, function (el) {
                        return {
                            label: splitKomma(el.name)[1] + " " + splitKomma(el.name)[0],
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
}