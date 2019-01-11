// api/services/passport.js

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    User.findOne({id}, function(err, user) {
        cb(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
}, function(username, password, cb){
    User.findOne({email: username}, function(err, user){
        if(err) return cb(err);
        if(!user) return cb(null, false, {message: 'Username not found'});
        bcrypt.compare(password, user.password, function(err, res){
            if(!res) return cb(null, false, { message: 'Invalid Password' });

            return cb(null, user, { message: 'Login Succesful'});
        });
    });
}));
