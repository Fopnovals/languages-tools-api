// api/policies/authenticated.js

module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.status(403).send({ message: 'Not Authorized' });
    }
};