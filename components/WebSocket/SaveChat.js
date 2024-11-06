import fs from "fs";

export const SaveChat = (userDir, receivedMSG) => {
  let chat = [];

  if (fs.existsSync(`${userDir}/${receivedMSG.userId}/chat.json`)) {
    chat = JSON.parse(fs.readFileSync(`${userDir}/${receivedMSG.userId}/chat.json`, 'utf8'));
  }

  chat.push(receivedMSG);
  fs.writeFileSync(`${userDir}/${receivedMSG.userId}/chat.json`, JSON.stringify(chat));
}