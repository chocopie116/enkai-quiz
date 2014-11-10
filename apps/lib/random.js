var uuid = require('node-uuid');

exports.generate = function() {
    return uuid.v4().split('-').join("");
}
