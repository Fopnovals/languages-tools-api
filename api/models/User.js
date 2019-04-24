/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let hash = function(values, next) {
    AuthService.hashPassword(values);
    next();
};

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
    }
  },
    beforeUpdate: hash,
    beforeCreate: hash
};
