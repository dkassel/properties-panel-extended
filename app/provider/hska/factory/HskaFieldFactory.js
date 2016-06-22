'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = {

    hskaPrefix : 'hska-',

    create : function(property) {
        var name = property.name,
            label = name.replace(this.hskaPrefix, '');

        return entryFactory.textField({
            id: name,
            description: 'Dynamic Parameter',
            label: label,
            modelProperty: name,
        });
    }
}