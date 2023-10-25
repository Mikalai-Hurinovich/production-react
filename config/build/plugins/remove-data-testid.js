const babel = require('babel-core');
const t = require('babel-types');

// Define the plugin name and visitor object
module.exports = (babel) => ({
    name: 'remove-data-testid',
    visitor: {
        // For example, JSXAttribute is the node type for JSX attributes
        JSXAttribute(path) {
            // For example, if the attribute name is data-testid, remove it from the node and clear final bundle
            const attrsToRemove = ['data-testid'];
            if (attrsToRemove.includes(path.node.name.name)) {
                path.remove();
            }
        },
    },
});
