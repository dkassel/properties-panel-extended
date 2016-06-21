'use strict';

var is = require('bpmn-js/lib/util/ModelUtil').is;

//extended usertask properties
var simpleUserTaskProps = require('./SimpleUserTaskProps'),
    followUpDateProp = require('./FollowUpDateProp'),
    priorityProp  = require('./PriorityProp');

require('jquery-ui');

module.exports = function (group, element) {

    simpleUserTaskProps(group, element);
    if (is(element, 'camunda:Assignable')) {
        followUpDateProp(group);
        priorityProp(group);
    }
};