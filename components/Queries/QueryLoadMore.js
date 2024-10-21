import fs from "node:fs";
import {PER_PAGE} from "../../define.js";


export const QueryLoadMore = (app, userDir) => {
  app.post("/loadMore", async (request, response) => {
    const { count, userId } = request.body;
    const userChat = JSON.parse(fs.readFileSync(`${userDir}/${userId}/chat.json`, 'utf8'));
    const offset = count === undefined ? 0 : Number(count);
    let sendChat = userChat.sort((a, b) => b.date - a.date);
    sendChat = sendChat.slice(offset, offset + PER_PAGE);

    const result = {
      status: "ok",
      message: sendChat,
    };
    response.send(JSON.stringify(result)).end();
  });
}