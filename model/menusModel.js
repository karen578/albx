const conn = require('./common.js')
module.exports = {
    addmenus(obj, callback) {
        //读取数据
        let sql = 'select value from `options` where id=9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                //把数据转换成数组
                var arr = JSON.parse(results[0].value)
                //往数组里面追加页面发送过来的对象
                arr.push(obj)
                // 把数组转换成字符串
                var str = JSON.stringify(arr)
                //把数据写入数据库
                sql = 'update options set value = ? where id=9 '
                conn.query(sql, str, (err1, results1) => {
                    if (err1) {
                        callback(err1)
                    } else {
                        callback(null)

                    }

                })

            }
        })

    },
    getmenus(callback) {
        let sql = 'select value from `options` where id=9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                //获得的是字符串需要把字符串转成数组传送出去
                var arr = JSON.parse(results[0].value)
                callback(null, arr)
            }
        })
    },
    getOptions(callback) {
        let sql = 'select value from `options` where id<9'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    updateOptions(obj, callback) {
        var cnt = 0
        // 构建Sql语句
        // {'site_name':'站点名称','site_description':'站点描述'}
        // update `options` set value = '阿里百秀 - 发现生活，发现美！1' where 	`key` = 'site_name'
        for (let key in obj) {
            var sql = `update options set value = '${obj[key]}' where ` + '`key`' + ` = '${key}'`
            conn.query(sql, (err) => {
                console.log(sql)
                if (err) {
                    callback(err)
                    return
                } else {
                    cnt++
                }
                if (cnt == 7) {
                    console.log(cnt)
                    callback(null)
                }
            })
        }
    }
}