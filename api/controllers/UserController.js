/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
var jwToken = require('jsonwebtoken');


module.exports = {

    _config: {
        actions: true,
        shortcuts: false,
        rest: false
    },
    'check': function(req, res) {
        //console.log(req.user);
        return res.json(req.user);
    },

    'signup': async function(req, res) {
        let createdUser = await User.create(req.body).fetch();
        return res.json(createdUser);
    },

    login: async function (req, res) {
        let user = await User.findOne({email: req.body.email})
        bcrypt.compare(req.body.password, user.encryptedPassword, function(err, result) {
            if(result) {
                //password is a match
                return res.json({
                    user:user,
                    token: jwToken.sign(
                        user,
                        sails.config.secret
                    )//generate the token and send it in the response
                });
            } else {
                //password is not a match
                return res.forbidden({err: 'Email and password combination do not match'});
            }
        });
    }
};

