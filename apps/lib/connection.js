var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'groupwork',
    user: process.env.DB_USER || 'demouser',
    password: process.env.DB_PASS || 'demopass',
    timezone: 'Asia/Tokyo'
});

exports.executeQuery = function(sql, params, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('[critical] Mysql connection error: ' + err);
            return callback(err, null);
        }
        var query = connection.query(sql, params,callback);
        query.on('error', function(err) {
            console.log('[err] Mysql query error: ' + err);
            return callback(err, null);
        });

        query.on('result', function(rows) {
            console.log(rows);
            return callback(false, rows);
        });

        query.on('end', function() {
            connection.release();
        });
    });
};
