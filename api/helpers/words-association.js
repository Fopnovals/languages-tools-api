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

      const ruArr = inputs.ru.split(', ');
      const enArr = inputs.en.split(', ');
      console.log(enArr);

    let existsEnWords = await Word.find({'name': enArr, language: 'en'});
    let existsRuWords = await Word.find({'name': ruArr, language: 'ru'});

    console.log('existsEnWords - ', existsEnWords);

    let enIds = await checkWords(inputs.en, existsEnWords);
    let ruIds = await checkWords(inputs.ru, existsRuWords);

    const associateResult = await associateWords(inputs.blockName, inputs.ownerId, ruIds, enIds);
    // All done.
    return exits.success(associateResult);
  }

};

async function associateWords(blockName, ownerId, ruIds, enIds) {
    // let block = await Block.find().where({ownerId: ownerId, name: blockName});
    // console.log(block);
}

async function checkWords(inputWords, dbWordsArray) {
    let ids = [];
    let inputWordsArray = inputWords.split(',');

    inputWordsArray.forEach(async (word) => {
        word = _.trim(word.toLowerCase());
        let dbWordId = null;

        dbWordsArray.forEach((existsWord) => {
            if(existsWord.name === word) {
                dbWordId = existsWord.id;
            }
        });

        if(!dbWordId) {
            ids.push(createWord(word));
        } else {
            ids.push(Promise.resolve(dbWordId));
        }
    });

    return Promise.all(ids);
}

async function createWord(word) {
    const wordId = await Word.create({
        name: word,
        language: 'en'
    }).fetch();

    return wordId.id;
}