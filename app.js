//引用核心模块
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const querystring = require('querystring')
const session = require('express-session')
//创建实例对象
const app = express()
//设置模板引擎
app.set('view engine', 'ejs')
app.set('views', 'views')
//设置静态资源托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))
// 使用中间件来实现登录保存
// app.use(function (req, res, next) {
//     var cookie = querystring.parse(req.headers.cookie)
//     if (cookie.islogin && cookie.islogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
//         //next:之前用户的请求操作
//         next()
//     } else {
//         res.redirect('/admin/login')
//     }

// })
// 让app应用使用session的方式来进行状态保持
app.use(session({
    ////这里的name值得是cookie的name，默认cookie的name是：connect.sid
    //name: 'hhw',
    secret: '随便什么值',
    //   cookie: ('name', 'value', { path: '/', httpOnly: true,secure: false, maxAge:  60000 }),
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: false,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: false,

}))
//使用中间件 ，让所有符合要求的链接进行状态保持
app.use(function (req, res, next) {
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
        next() //
    } else {
        //重定向
        res.redirect('/admin/login')
    }

})

//创建服务器
app.use(bodyParser.urlencoded({
    extended: false
}))
app.listen(3000, () => {
    console.log('express is running at http://127.0.0.1:3000');
})
// 注册中间件调用路由方法
app.use(router)