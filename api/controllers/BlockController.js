/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {
        let userId = req.user.id;
        if (!userId) {
            return res.send({
                message: `Can't find user`
            })
        }

        if (!req.body.name) {
            return res.send({
                message: `Empty module name`
            })
        }

        const module = {
            name: req.body.name,
            ownerId: userId,
            users: [userId]
        }

        try {
            let blocks = await Block.find({name: req.body.name});

            if(!blocks || !blocks.length) {
                createNewBlock();
            } else {
                let userHasSomeBlock = blocks.some((block) => {
                    return block.ownerId === userId;
                });

                userHasSomeBlock ? res.send({message: 'You already have some block. Please change the name.'}) : createNewBlock();
            }

        } catch (err) {
            res.send({message: err})
        }

        async function createNewBlock() {
            let newBlock = await Block.create(module).fetch()
            res.send(newBlock)
        }
    },
    getIAmUser: async (req, res) => {
        try {
            let userId = req.user.id;
            const blocks = await Block.find({users: {elemMatch: userId}});
            console.log('====');
            console.log(blocks);
            res.send(blocks);
        } catch (err) {
            res.send({message: err})
        }

    }

};

