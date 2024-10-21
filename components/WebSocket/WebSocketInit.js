import fs from "node:fs";
import WebSocket, {WebSocketServer} from "ws";
import {SaveChat} from "./SaveChat.js";
import {checkDir} from "../../functions.js";
import {PER_PAGE} from "../../define.js";

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
          let sendChat;

          if (userChat.length >= 10) {
            sendChat = userChat.slice(-PER_PAGE);
          } else {
            sendChat = userChat;
          }

          ws.send(JSON.stringify({id: req.headers['sec-websocket-key'], userId: receivedMSG.userId, chat: sendChat}));
          break;
      }

    });
    [...wsServer.clients]
      .filter((o) => o.readyState === WebSocket.OPEN)
      .forEach((o) => o.send(JSON.stringify({id: req.headers['sec-websocket-key'], status: 'connect'})));
  });
};