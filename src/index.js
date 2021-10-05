import Koa from "koa";
import http from "http";
import socket from "socket.io";

const appSocket = new Koa();
const server = http.createServer(appSocket.callback());
const io = socket(server);
const SERVER_PORT = "localhost";
const SERVER_HOST = 3334;

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `[HTTP] listen => server is running at http://${SERVER_PORT}:${SERVER_HOST}`
  );
  console.log(`[HTTP] listen => Press  CTRL+ C to stop it`);
});

// app.listen(3334, () => {
//   console.log(`Servidor rodando na porta ${3334}`);
// });
