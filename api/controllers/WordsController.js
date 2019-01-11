/**
 * WordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    associate: async (req, res) => {
        let userId = req.user.id;
        let result;

        if (!userId) {
            return res.send({
                message: `Can't find user`
            })
        }

        if (!req.body.blockName) {
            return res.send({
                message: `Empty module name`
            })
        }

        const block = await Block.findOne({
            name: req.body.blockName,
            ownerId: userId
        })

        if(block) {
            const result = await sails.helpers.wordsAssociation(req.body.ru, req.body.en, req.body.blockName, userId);

            console.log('IDS------');
            console.log(result);
        }

        // console.log('===');
        // console.log(block);
        res.send('Ok')
        // console.log(req.body.en);
    }

};

