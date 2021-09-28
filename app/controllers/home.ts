import Koa from 'koa'
import { messageArr, userArr } from '../websocket/data'
// 这里 es6 和 module 混用非常不优雅
class Home {

  getUserList(ctx: Koa.BaseContext) {
    //@ts-ignore
    ctx.body = {
      useList: userArr
    }
  }

  getMessageList(ctx: Koa.BaseContext) {
    //@ts-ignore
    ctx.body = {
      messageList: messageArr
    }
  }


}

module.exports = new Home()