/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
    schema: true,
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    pushNotifications: {
      type: 'boolean',
      defaultsTo: true
    },
    role: {
      type: 'string',
      defaultsTo: 'user',
      enum: ['admin', 'user', 'company-admin']
    },
    language: {
      type: 'string',
      defaultsTo: 'en',
      enum: ['en', 'ru']
    },
    password: {
        type: 'string',
        required: true
    },
    confirmation: {
      type: 'string'
    },
    modules: {
      model: 'Block'
    },
    encryptedPassword: {
        type: 'string'
    }
  },
  customToJSON: function() {
      return _.omit(this, ['encryptedPassword'])
  },
  beforeCreate : function (values, next) {
      bcrypt.genSalt(10, function (err, salt) {
          if(err) return next(err);
          bcrypt.hash(values.password, salt, function (err, hash) {
              if(err) return next(err);
              values.encryptedPassword = hash;
              next();
          })
      })
  },

  comparePassword : function (password, user, cb) {
      bcrypt.compare(password, user.encryptedPassword, function (err, match) {

          if(err) cb(err);
          if(match) {
              cb(null, true);
          } else {
              cb(err);
          }
      })
  }
};
