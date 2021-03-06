/**
 * Block.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string'
        },
        ownerId: {
            type: 'string'
        },
        associations: {
            type: 'json',
            columnType: 'array'
        },
        users: {
            type: 'json',
            columnType: 'array'
        },
        public: {
            type: 'boolean',
            defaultsTo: false
        }
    },

};

