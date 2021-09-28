import { WebSocket } from "ws";
import { MessageProp, MessageType, UserProp } from "./type";

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

    try {
      const tempData = JSON.parse(data)
      console.log(tempData)
      // 初次登陆分配 id
      // 单独发送一次给该用户
      if ((tempData as unknown as MessageProp).type === MessageType.INIT) {
        const temp: MessageProp = {
          ...tempData,
          id: Date.now(),
          message: 'success'
        }
        send(ws, temp)
        // 广播给其他用户正式接入 ws
        const other: MessageProp = {
          ...temp,
          type: MessageType.SYSTEM
        }
        boardcast(other)

      } else {
        boardcast(tempData)
      }

    } catch (e) {
      console.log(e)
    }

  });
  ws.on("close", function close(ws: WebSocket) {

  })
});
