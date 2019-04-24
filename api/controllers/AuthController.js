/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let passport = require('passport');

module.exports = {
    register: async function(req, res) {
        let user = await User.create(_.omit(req.allParams(), 'id'))
            .fetch()
            .catch((err) => {
                res.serverError(err)
            })
        if (user) {
            res.json({user: user});
        }
    },
    login: function(req, res) {
        passport.authenticate('local',
            AuthService.passportAuth.bind(this, req, res))(req, res);
    },
};
