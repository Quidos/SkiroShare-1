import express from "express";
import http from "http";

const PORT = 4000;

const app = express();
const server = http.createServer(app)
server.listen(PORT, () => console.log("Listening...."))