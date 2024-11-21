import userState from "../../users.json" with { type: "json" };
import crypto from "crypto";
import fs from "fs";
import {checkDir} from "../../functions.js";

export const QueryLogin = (ctx, userDir) => {
  if (Object.keys(ctx.request.body).length === 0) {
    const result = {
      status: "error",
      message: "Empty query",
    };
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.status = 400;
    ctx.response.body = JSON.stringify(result);

    return;
  }

  const { name, password } = JSON.parse(ctx.request.body);
  let user = userState.find((user) => user.name === name && user.password === password);

  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name,
      password,
    };
    userState.push(user);
    fs.writeFileSync('users.json', JSON.stringify(userState));
  }

  checkDir(userDir + '/' + user.id);

  const result = {
    status: "ok",
    user: {
      id: user.id,
      name: user.name,
    },
  };

  ctx.response.body = JSON.stringify(result);
}