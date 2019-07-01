const express = require('express')

const app = express()
//设置模板引擎
app.set('view engine', 'ejs')
app.set('views', 'views')
//设置静态资源托管
app.use('/node_modules', express.static('node_modules'))

//创建服务器
app.listen(3000, () => {
    console.log('express is running at http://127.0.0.1:3000');
})