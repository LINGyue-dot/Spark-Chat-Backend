const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7000 });

wss.on('connection', function connection(ws) {
  console.log('server: connection successfully');

  ws.on('message', function incoming(message) {
    console.log(`server: received: %s`, message);
  });

  ws.send('world');
});
