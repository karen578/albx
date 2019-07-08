//引入第三方模块
const mysql = require('mysql')
//连接数据库
const conn = mysql.createConnection({
    //数据库的ip地址
    host: '127.0.0.1',
    //数据库的名称
    user: 'root',
    //数据库的密码
    password: 'root',
    //数据库的的存放数据的位置名称
    database: 'baixiu',
    // 数据库的转换日期的时候默认是转换成日期对象格式，需要自己进行转换正确的日期
    dateStrings: true
})
module.exports = conn