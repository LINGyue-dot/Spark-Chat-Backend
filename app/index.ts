
const koa = require('koa');
const cors = require('koa-cors')

const Router = require('koa-router')

const router = new Router({ prefix: '/ws' })

const home = require('./controllers/home')

router.get('/users', home.getUserList)
router.get('/messages', home.getMessageList)

const app = new koa();

app.use(cors()).use(router.routes()).use(router.allowedMethods())

require('./websocket');

app.listen(3100, () => console.log('server start successfully in port 3100'));
