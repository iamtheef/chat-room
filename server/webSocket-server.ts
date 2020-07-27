import { app } from "./configuration";

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
server.listen(4001);

let connected = [];
io.sockets.on("connection", (socket: any) => {
  connected.push(socket);
  console.log("Total users connected : ", connected.length);
});
