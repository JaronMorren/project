const express = require('express');
const fileSystem = require('fs');

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log('Hi there, I am Online');
});
