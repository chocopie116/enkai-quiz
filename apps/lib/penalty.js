var con = require('./connection');

var Penalty = function() {
};

module.exports = Penalty;

/**
 * 一番回答が遅いユーザーの正答数を減らす
 * @param integer questionId
 *
 * @return result
 */
Penalty.prototype.impose = function(questionId, callback) {
    var sql = 'select user_id from user_answer where is_correct = 1 and question_id = ? order by answer_msec desc limit 1';
    con.executeQuery(sql, [questionId], function(err, result) {
        if (err) {
            return callback(err, null);
        }

        if (result.length == 0) {
            return callback('回答データがありません', null);
        }

        var slowestUserId = result[0].user_id;

        var sql = 'update user_answer set is_penalty = 1 where user_id = ? and question_id = ?';
        con.executeQuery(sql, [slowestUserId, questionId], function(err, result) {
            if (err) {
                return callback(err, null);
            }

            return callback(null, true);
        });
    });
};
