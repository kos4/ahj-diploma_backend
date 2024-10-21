import http from "http";
import express from "express";
import {InitServer} from "./components/InitServer/InitServer.js";
import {WebSocketInit} from "./components/WebSocket/WebSocketInit.js";
import {QueriesInit} from "./components/Queries/QueriesInit.js";
import {QueryLogin} from "./components/Queries/QueryLogin.js";
import {QueryLoadMore} from "./components/Queries/QueryLoadMore.js";

const app = express();
const userDir = './users';
const server = http.createServer(app);

QueriesInit(app);
QueryLogin(app, userDir);
QueryLoadMore(app, userDir);
WebSocketInit(server, userDir);
InitServer(server);
