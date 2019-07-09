const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu',
    dateStrings: true
})
conn.connect()

module.exports = {
    getAllCateList(callback) {
        let sql = 'select * from categories'
        conn.query(sql, (err, result) => {
            if (err) return callback(err)
            callback(null, result)
        })
    },
    getcateById(id, callback) {
        let sql = 'select * from categories where id= ? '
        conn.query(sql, id, (err, result) => {
            if (err) return callback(err)
            callback(null, result[0])
        })
    },
    delcateById(id, callback) {
        //sql语句的需要用模板字符串拼接
        let sql = ` delete from categories where id in (${id}) `
        conn.query(sql, (err, result) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    editcateById(obj, callback) {
        let sql = 'update categories set ? where id= ?'
        conn.query(sql, [obj, obj.id], (err, result) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    Addcate(obj, callback) {
        var sql = "insert categories values(null,?,?)"
        conn.query(sql, [obj.slug, obj.name], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    }

}