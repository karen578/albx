const express = require('express')
//创建实例对象
const app = express()
app.listen(3005, () => {
    console.log('express is running at http://127.0.0.1:3005')
})
app.get('/', (req, res) => {
    console.log(req.headers);
})