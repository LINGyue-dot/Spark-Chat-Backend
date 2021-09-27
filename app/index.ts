const koa = require('koa');

const app = new koa();

require('./websocket');

app.listen(3100, () => console.log('server start successfully in port 3100'));
