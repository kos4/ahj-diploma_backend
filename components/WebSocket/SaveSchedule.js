import fs from "fs";

export const SaveSchedule = (userDir, receivedMSG) => {
  let schedule = [];

  if (fs.existsSync(`${userDir}/${receivedMSG.userId}/schedule.json`)) {
    schedule = JSON.parse(fs.readFileSync(`${userDir}/${receivedMSG.userId}/schedule.json`, 'utf8'));
  }

  schedule.push(receivedMSG.data);
  fs.writeFileSync(`${userDir}/${receivedMSG.userId}/schedule.json`, JSON.stringify(schedule));
}