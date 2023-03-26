## 准备工作

1. 申请一个ChatGTP账号
2. 一台可以访问外网的服务器

## 服务器环境配置

安装nodejs14以上版本

## 服务端项目配置

1. 在项目根目录下创建一个文件夹，命名为ChatGPT 
2. ```pnpm init```初始化项目
3. 修改package.json·文件，添加以下内容

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

4. ```pnpm add chatgpt express isomorphic-fetch```安装依赖
   <https://github.com/transitive-bullshit/chatgpt-api>
5. 在chatgtp文件夹下创建一个文件，命名为index.js
6. 编辑index.js，添加以下内容

```js
import express from 'express'
import { ChatGPTAPI } from 'chatgpt'
import fetch from 'isomorphic-fetch'
const app = express()
const PORT = process.env.PORT as any || 3001
const apiKey = '********'// openai的apikey
app.get('/', (req, res) => {
  const { key, ask, parentMessageId } = req.query
  if (key !== '123')
    return res.send('key is required')
  if (!ask)
    return res.send('ask is required')
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  const api = new ChatGPTAPI({ apiKey, fetch })
  api.sendMessage(ask, {
    parentMessageId,
    onProgress: (p) => {
      res.write(`id: ${p.id}\n\n`)
      res.write(`data: ${JSON.stringify({ status: 'ok', ...p })}\n\n`)
    },
  }).then((r) => {
    res.write(`data: ${JSON.stringify({ status: 'end', res: r })}\n\n`)
    // res.end('end')
  }).catch((e) => {
    res.write(`data: ${JSON.stringify({ status: 'error', error: e })}\n\n`)
  })
})
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
```
## 启动服务
  
  ```pnpm start```启动服务

## 客户端请求
  
```js
const eve = new EventSource(`/api/chat-gpt?ask=${inputValue.value}&parentMessageId=${pid ?? ''}`, { withCredentials: true })
eve.onmessage = (e) => {
  const data = JSON.parse(e.data) as ChatResult
  if (data.status === 'ok')
    console.log(data)
  if (data.status === 'end') {
    eve.close()
    loading.value = false
  }
}
eve.onopen = (e) => {
  loading.value = true
}
eve.onerror = (e) => {
  loading.value = false
  window.$message.error('服务器连接错误')
  eve.close()
}
```
