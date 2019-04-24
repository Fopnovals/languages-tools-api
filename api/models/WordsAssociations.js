/**
 * WordsAssociations.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      blockId: {
        type: 'string'
      },
      ruWords: {
        type: 'json'
      },
      enWords: {
        type: 'json'
      }
  },

};

