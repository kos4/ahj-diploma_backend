import http from "http";
import express from "express";
import {InitServer} from "./components/InitServer/InitServer.js";
import {WebSocketInit} from "./components/WebSocket/WebSocketInit.js";
import {QueriesInit} from "./components/Queries/QueriesInit.js";
import {QueryLogin} from "./components/Queries/QueryLogin.js";

const app = express();
const userDir = './users';
const server = http.createServer(app);

QueriesInit(app);
QueryLogin(app, userDir);
WebSocketInit(server, userDir);
InitServer(server);
