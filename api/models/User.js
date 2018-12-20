/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
    }
  }
};
