import { WebSocket } from "ws";
import { MessageProp, UserProp } from "./type";

const WS = require('ws');

const wss = new WS.Server({ port: 7000 });

// 客户端数组 maxLength = 50 时间戳直接作为 id
const clientArr: UserProp[] = [];

function send(ws: WebSocket, data: MessageProp) {
  ws.send(JSON.stringify(data));
}

// 广播
function boardcast(data: MessageProp) {
  wss.clients.forEach((client: WebSocket) => {
    send(client, data);
  });
}

wss.on('connection', function connection(ws: WebSocket) {
  console.log('!!! SystemNotice:new connection');
  ws.on('message', function incoming(data: string) {
    // data:{id,username,message}
    //
    console.log(JSON.parse(data));
    send(ws, JSON.parse(data));
  });

  ws.on("close", function close(ws: WebSocket) {

  })
});
