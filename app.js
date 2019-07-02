//引用核心模块
const express = require('express')
const router = require('./router')
//创建实例对象
const app = express()
//设置模板引擎
app.set('view engine', 'ejs')
app.set('views', 'views')
//设置静态资源托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))
//创建服务器
app.listen(3000, () => {
    console.log('express is running at http://127.0.0.1:3000');
})
// 注册中间件调用路由方法
app.use(router)