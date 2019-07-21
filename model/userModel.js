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
    login(email, callback) {
        let sql = ' select * from users where email=?'
        conn.query(sql, email, (err, result) => {
            if (err) return callback(err)
            callback(null, result[0])
        })

    },
    getUsers(callback) {
        let sql = 'select * from users'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    delUser(id, callback) {
        //根据id删除多条数据，需要用到模板字符串
        let sql = `delete from users where id in (${id})`
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    addUsers(obj, callback) {
        //不要写错sql语句
        let sql = 'insert into users set ? '
        conn.query(sql, obj, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    getUserById(id, callback) {
        let sql = 'select * from users where id = ?'
        conn.query(sql, id, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results[0])
            }
        })

    },
    editUsers(obj, callback) {
        let sql = 'update users set ? where id = ?'
        conn.query(sql, [obj, obj.id], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

}