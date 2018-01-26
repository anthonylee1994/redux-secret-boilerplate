const toKebabCase = require("lodash/kebabCase");

module.exports = {
    locals: function (options) {
        return {
            kebabEntityName: toKebabCase(options.entity.name),
        };
    },
    fileMapTokens: function (options) {
        return {
            __name__: function (options) {
                return toKebabCase(options.entity.name);
            }
        }
    },
};
