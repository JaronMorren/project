const fileSystem = require('fs').promises;

async function readTalkersData() {
  try {
    const talkersData = await fileSystem.readFile('src/talker.json', 'utf-8');
    return JSON.parse(talkersData);
  } catch (error) {
    console.error(error.message);
  }
}

async function editTalkersData(talkersData) {
  try {
    const updatedData = JSON.stringify(talkersData);
    await fileSystem.writeFile('src/talker.json', updatedData);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  readTalkersData,
  editTalkersData,
};