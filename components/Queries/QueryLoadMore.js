import fs from "fs";
import {PER_PAGE} from "../../define.js";

export const QueryLoadMore = (ctx, userDir) => {
  const { count, userId } = JSON.parse(ctx.request.body);
  const userChat = JSON.parse(fs.readFileSync(`${userDir}/${userId}/chat.json`, 'utf8'));
  const offset = count === undefined ? 0 : Number(count);
  let sendChat = userChat.sort((a, b) => b.date - a.date);
  sendChat = sendChat.slice(offset, offset + PER_PAGE);

  const result = {
    status: "ok",
    message: sendChat,
  };
  ctx.response.body = JSON.stringify(result);
}