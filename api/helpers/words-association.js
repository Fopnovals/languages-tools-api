module.exports = {


  friendlyName: 'Words association',


  description: '',


  inputs: {
      ru: {
          type: 'ref'
      },
      en: {
          type: 'ref'
      },
      blockName: {
          type: 'ref'
      },
      ownerId: {
          type: 'ref'
      }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

      let enIds, ruIds;

      let ruArr = stringToArray(inputs.ru);
      let enArr = stringToArray(inputs.en);

      let existsEnWords = await Word.find({name: enArr, language: 'en'});
      let existsRuWords = await Word.find({name: ruArr, language: 'ru'});
      let block = await Block.findOne({ownerId: inputs.ownerId, name: inputs.blockName});

      if(!existsEnWords.error && !existsRuWords.error) {
          enIds = await checkWords(enArr, existsEnWords, 'en');
          ruIds = await checkWords(ruArr, existsRuWords, 'ru');
      } else {
          return exits.success(existsEnWords.error || existsRuWords.error);
      }

      const associateResult = await associateWords(block.id, inputs.ownerId, ruIds, enIds);
      if(!associateResult.error) {
          const result = await addAssotiationsToBlock(block, associateResult);
          return exits.success(result);
      } else {
          return exits.success(associateResult);
      }
  }
};

async function addAssotiationsToBlock(block, associateResult) {
    try {
        let associations = [];
        if(!block.associations || !block.associations.length) {
            associations = [associateResult.id];
        } else {
            if(block.associations.indexOf(associateResult.id) === -1) {
                block.associations.push(associateResult.id);
                associations = block.associations;
            } else {
                return block;
            }
        }

        const updatedBlock = await Block.update({id: block.id}).set({associations: associations}).fetch();
        return updatedBlock[0];
    } catch {
        return {error: 'Something went wrong when tried update block with associations'};
    }
}

function stringToArray(stringWords) {
    let wordsArray = stringWords.split(',');
    wordsArray = wordsArray.map((word) => {
        return _.trim(word.toLowerCase());
    });
    return wordsArray;
}

async function associateWords(blockId, ownerId, ruIds, enIds) {
    try {
        const associationsCriteria = {
            blockId: blockId,
            ruWords: ruIds,
            enWords: enIds
        };

        let existsAssociations = await WordsAssociations.findOne(associationsCriteria);
        if(!existsAssociations) {
            existsAssociations = await WordsAssociations.create(associationsCriteria).fetch();
        }
        return existsAssociations;
    } catch {
        return {error: 'Something went wrong when tried create associations'};
    }
}

async function checkWords(inputWordsArray, dbWordsArray, language) {
    let ids = [];

    try {
        inputWordsArray.forEach(async (word) => {
            word = _.trim(word.toLowerCase());
            let dbWordId = null;

            dbWordsArray.forEach((existsWord) => {
                if(existsWord.name === word) {
                    dbWordId = existsWord.id;
                }
            });

            if(!dbWordId) {
                ids.push(createWord(word, language));
            } else {
                ids.push(Promise.resolve(dbWordId));
            }
        });

        return Promise.all(ids);
    } catch {
        return {error: 'Something went wrong when tried create words'};
    }
}

async function createWord(word, language) {
    try {
        const wordId = await Word.create({
            name: word,
            language: language
        }).fetch();

        return wordId.id;
    } catch {
        return {error: 'Something went wrong when tried create words'};
    }
}