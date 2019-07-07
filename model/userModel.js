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

    }
}