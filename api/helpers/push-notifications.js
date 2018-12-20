var FCM = require('fcm-node');
var fcm = new FCM(sails.config.fcm.serverKey);
module.exports = {


  friendlyName: 'Push notifications',


  description: '',


  inputs: {
    deviceTokens: {
      type: 'ref'
    },
    msg: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    _.forEach(_.chunk(inputs.deviceTokens, 800), (chunkedTokens) => {
      console.log('tokens: ', chunkedTokens);
      let message = {
        // dry_run: true,
        registration_ids: chunkedTokens,
        notification: {
          body: inputs.msg
        },
        data: {
          body: inputs.msg
        }
      };
      fcm.send(message, async (err, response) => {
        if (err) {
          console.log(err);
          console.log('Something has gone wrong!');
          return exits.success('Error');

        } else {
          console.log('Successfully sent with response: ', response);
          return exits.success(true);
        }
      });
    });



  }


};
