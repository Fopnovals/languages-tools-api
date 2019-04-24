var passport = require('passport');
/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    '*': ['isAuthorized'], // Everything resctricted here
    'UserController': {
        'signup': true, // We dont need authorization here, allowing public access
        'login': true // We dont need authorization here, allowing public access
    }
};
