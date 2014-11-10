var con = require('./connection'),
    async = require('async');

var User = function() {
};

module.exports = User;

User.prototype.getUser = function(sid, callback) {
    con.executeQuery('select * from user_master where session = ?;', [sid] , function(err, result) {
        if (err) {
            return callback(err, null);
        }

        if (result.length == 0) {
            return callback(null, []);
        }

        return callback(null, result[0]);
    });
};

User.prototype.register = function(username, sid, callback) {
    con.executeQuery('insert into user_master (user_name, session, correct_answer_count, correct_answer_msec, created_at, updated_at) values (?, ?, 0, 0, now(), now()) ', [username, sid], function(err, result) {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                return callback(null, null);
            }
            return callback(err, null);
        }

        return callback(null, true);
    });
};

