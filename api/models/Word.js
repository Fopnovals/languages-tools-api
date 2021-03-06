/**
 * Word.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    language: {
      type: 'string',
      enum: ['en', 'ru']
    },
    name: {
      type: 'string'
    }
  }

};

