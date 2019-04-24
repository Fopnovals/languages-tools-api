/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken');

module.exports = {
    'sign': function(payload) {
        return jwt.sign({
            data: payload
        }, sails.config.secret, {expiresIn: 30});
    },
    'verify': function(token, callback) {
        jwt.verify(token, sails.config.secret, callback);
    }
};
