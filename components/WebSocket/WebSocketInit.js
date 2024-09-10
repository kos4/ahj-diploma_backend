import fs from "node:fs";
import WebSocket, {WebSocketServer} from "ws";
import {SaveChat} from "./SaveChat.js";
import {checkDir} from "../../functions.js";

export const WebSocketInit = (server, userDir) => {
  const wsServer = new WebSocketServer({ server });
  wsServer.on("connection", (ws, req) => {
    ws.on("message", (msg, isBinary) => {
      const receivedMSG = JSON.parse(msg);

      checkDir(userDir + '/' + receivedMSG.userId);

      switch (receivedMSG.type) {
        case "send":
          SaveChat(userDir, receivedMSG);

          [...wsServer.clients]
            .filter((o) => o.readyState === WebSocket.OPEN)
            .forEach((o) => o.send(msg, { binary: isBinary }));
          break;
        case "getData":
          const userChat = fs.existsSync(`${userDir}/${receivedMSG.userId}/chat.json`) ? JSON.parse(fs.readFileSync(`${userDir}/${receivedMSG.userId}/chat.json`, 'utf8')) : [];

          ws.send(JSON.stringify({id: req.headers['sec-websocket-key'], userId: receivedMSG.userId, chat: userChat}));
          break;
      }

    });
    [...wsServer.clients]
      .filter((o) => o.readyState === WebSocket.OPEN)
      .forEach((o) => o.send(JSON.stringify({id: req.headers['sec-websocket-key'], status: 'connect'})));
  });
};