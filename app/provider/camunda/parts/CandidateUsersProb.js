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
        id: 'candidateUsers',
        description: 'A list of candidates for this User Task',
        label: 'Candidate Users',
        modelProperty: 'candidateUsers'
    }));

    var candidateUsersSelektor = $("#camunda-candidateUsers");

    candidateUsersSelektor.bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
            event.preventDefault();
        }
    });
    candidateUsersSelektor.autocomplete({
        minLength: 0,
        source: function( request, response ) {
            var searchTerm = extractLast(request.term);
            console.log (searchTerm);
            $.ajax({
                url: "http://test-cdn.abas.de/hska/bpmn/users?q=" + searchTerm,
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
        },
        focus: function() {
            // prevent value inserted on focus
            return false;
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = terms.join( "; " );

            var selected_label = ui.item.label;
            var selected_value = ui.item.value;

            var labels = $('#labels').val();
            var values = $('#values').val();

            if(labels == "")
            {
                $('#labels').val(selected_label);
                $('#values').val(selected_value);
            }
            else
            {
                $('#labels').val(labels+";"+selected_label);
                $('#values').val(values+";"+selected_value);
            }

            return false;
        }
    });
}