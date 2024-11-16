import Koa from "koa";
import {koaBody} from "koa-body";
import koaStatic from "koa-static";
import cors from '@koa/cors';
import http from "http";
import {QueryLogin} from "./components/Queries/QueryLogin.js";
import {WebSocketInit} from "./components/WebSocket/WebSocketInit.js";
import {InitServer} from "./components/InitServer/InitServer.js";
import {QueryLoadMore} from "./components/Queries/QueryLoadMore.js";
import {QuerySendFiles} from "./components/Queries/QuerySendFiles.js";
import {QueryLoadSchedule} from "./components/Queries/QueryLoadSchedule.js";

const app = new Koa();
app.use(cors());
const server = http.createServer(app.callback());
const userDir = './users';
const filesDir = './public';

app.use(koaStatic(filesDir));
app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));
app.use((ctx, next) => {
  if (ctx.request.method === 'POST') {
    switch (ctx.request.url) {
      case '/sendFiles':
        QuerySendFiles(ctx, filesDir);
        break;
      case '/login':
        QueryLogin(ctx, userDir);
        break;
      case '/loadMore':
        QueryLoadMore(ctx, userDir);
        break;
      case '/loadSchedule':
        QueryLoadSchedule(ctx, userDir);
        break;
    }
  }

  next();
});

WebSocketInit(server, userDir);
InitServer(server);
