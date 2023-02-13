const express = require('express');
const fileSystem = require('fs');
const crypto = require('crypto');
const { readTalkersData, writeTalkersData } = require('./utilities/fileSystemTalker');
const loginValidation = require('./middleware/loginValidation');
const ageValidation = require('./middleware/ageValidation');
const nameValidation = require('./middleware/nameValidation'); 
const talkValidation = require('./middleware/talkValidation');
const tokenValidation = require('./middleware/tokenValidation');
const watchedAtValidation = require('./middleware/watchedAtValidation');
const rateValidation = require('./middleware/rateValidation');

const app = express();
app.use(express.json());

// https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
app.post('/login', loginValidation,
 async (_request, response) => {
  const tokenGenerator = crypto.randomBytes(8).toString('hex');
  console.log(tokenGenerator);

  return response.status(200).json({
    token: tokenGenerator,
  });
  });  

app.listen(3000, () => {
  console.log('Hi there, I am Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

// https://www.geeksforgeeks.org/node-js-fs-readfile-method/
app.get('/talker', (_request, response) => {
  fileSystem.readFile('src/talker.json', 'utf-8', (_error, data) => {
    response.status(200).json(JSON.parse(data));
  });
});

app.get('/talker/:id', (request, response) => {
  fileSystem.readFile('src/talker.json', 'utf-8', (_error, data) => {
    const talkers = JSON.parse(data);
    const talkerID = talkers.find((talker) => talker.id === Number(request.params.id));
    if (!talkerID) {
      response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    } else {
      response.status(200).json(talkerID);
    }
  });
});

app.post('/talker', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
async (request, response) => {
  const talkers = await readTalkersData();
  const createTalker = { ...request.body, id: talkers.length + 1 };
  const updateTalkers = [...talkers, createTalker];
  writeTalkersData(updateTalkers);
  return response.status(201).json(createTalker);
}); 

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation, 
talkValidation,
watchedAtValidation,
rateValidation,
async (request, response) => {
  const talkers = await readTalkersData();
  const { id } = request.params;
  const { name, age, talk: { watchedAt, rate } } = request.body;
    const editTalker = { age, name, talk: { watchedAt, rate }, id: Number(id) };
    // https://bobbyhadz.com/blog/javascript-array-find-index-of-object-by-property
    const talkerID = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[talkerID] = editTalker;
    await writeTalkersData(talkers);
    return response.status(200).json(editTalker);
  });