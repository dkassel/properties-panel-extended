module.exports = {
    __depends__: [
        require('bpmn-js-properties-panel/lib/provider/camunda/element-templates')
    ],
    __init__: [ 'propertiesProvider' ],
    propertiesProvider: [ 'type', require('./CamundaPropertiesProvider') ]
};