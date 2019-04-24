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
        });

        if(!block) {
            const module = {
                name: req.body.blockName,
                ownerId: userId,
                users: [userId]
            };
            let newBlock = await Block.create(module).fetch();
            result = await sails.helpers.wordsAssociation(req.body.ru, req.body.en, newBlock.name, userId);
        } else {
            result = await sails.helpers.wordsAssociation(req.body.ru, req.body.en, req.body.blockName, userId);
        }

        if(result.error) {
            res.serverError(result.error);
        } else {
            res.send(result);
        }
    }

};

