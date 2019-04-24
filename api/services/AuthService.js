let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: function(user) {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password);
        }
    },
    comparePassword: function(password, user) {
        return bcrypt.compareSync(password, user.password);
    },
    createToken: function(user) {
        return jwt.sign({
                user: user.toJSON(),
            },
            sails.config.jwt.secretOrKey,
            {
                algorithm: sails.config.jwt.algorithm,
                expiresIn: sails.config.jwt.expiresInMinutes,
                issuer: sails.config.jwt.issuer,
                audience: sails.config.jwt.audience,
            }
        );
    },
    localStrategy(email, password, next) {
        User.findOne({email: email})
            .exec(function(error, user) {
                if (error) return next(error, false, {});

                if (!user) return next(null, false, {
                    code: 'E_USER_NOT_FOUND',
                    message: email + ' is not found'
                });

                if (!AuthService.comparePassword(password, user)) {
                    return next(null, false, {
                        code: 'E_WRONG_PASSWORD',
                        message: 'Password is wrong'
                    });
                }

                return next(null, user, {});
            });
    },
    jwtStrategy(req, payload, next) {
        let user = payload.user;
        // do your things with user like recording usage of api
        return next(null, user, {});
    },
    passportAuth(req, res, error, user, info) {
        if (error) return res.serverError(error);
        if (!user) {
            return res.forbidden({code: info.code, message: info.message});
        }
        return res.ok({
            token: AuthService.createToken(user),
            user: user,
        });
    }
};