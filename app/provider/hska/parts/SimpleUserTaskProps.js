'use strict';


var is = require('bpmn-js/lib/util/ModelUtil').is;

//extended usertask properties
var assigneeProp = require('./AssigneeProp'),
    candidateUsersProp  = require('./CandidateUsersProp'),
    candidateGroupsProp  = require('./CandidateGroupsProp'),
    dueDateProp = require('./DueDateProp');

require('jquery-ui');

module.exports = function (group, element) {

    if (is(element, 'camunda:Assignable')) {
        assigneeProp(group);
        candidateUsersProp(group);
        candidateGroupsProp(group);
        dueDateProp(group);
    }
};