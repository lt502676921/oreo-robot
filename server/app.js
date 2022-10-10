const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors')
const { getFileJsonData } = require('./utils/utils')

const app = new Koa()

app.use(cors())

app.use(async (ctx, next) => {
  const url = ctx.request.url
  if (url == '/') {
    try {
      let filePath = path.join(__dirname, './corpus-en.json')
      const result = await getFileJsonData(filePath)
      ctx.response.body = result
    } catch (error) {
      const errorMsg = {
        message: '读取文件内容失败,资源不存在',
        status: '404',
      }
      console.log('请求失败：', errorMsg)
      ctx.response.body = JSON.stringify(errorMsg)
    }
  }
  // await next()
})

app.listen(9997, () => {
  console.log('Server Start Complete: \thttp://localhost:9997')
})
