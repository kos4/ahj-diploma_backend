import userState from "../../users.json" assert { type: "json" };
import crypto from "crypto";
import fs from "node:fs";
import {checkDir} from "../../functions.js";

export const QueryLogin = (app, userDir) => {
  app.post("/login", async (request, response) => {
    if (Object.keys(request.body).length === 0) {
      const result = {
        status: "error",
        message: "Empty query",
      };
      response.status(400).send(JSON.stringify(result)).end();
    }

    const { name, password } = request.body;
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
    response.send(JSON.stringify(result)).end();
  });
}