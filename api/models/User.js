/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
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
    modules: {
      model: 'Block'
    }
  },
  customToJSON: function() {
      // Return a shallow copy of this record with the password and ssn removed.
      return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if(err) {
                  console.log(err);
                  cb(err);
              } else {
                  user.password = hash;
                  console.log(hash);
                  cb(null, user);
              }
          });
      });
  }
};
