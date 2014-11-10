var app = module.parent.exports,
async = require('async'),
con  = require('./connection'),
User = require('./user'),
Question = require('./question');

var Answer = function() {
};
var qidUidToAnswerId = {};

module.exports = Answer;

/**
 * 回答済みか
 */
Answer.prototype.hasAnswered = function(userId, questionId, callback) {
    console.log(questionId);
    return (qidUidToAnswerId[questionId + '_' + userId])
        ? callback(null, true)
        : callback(null, false)
        ;
};

/**
 * 回答を保存処理
 */
Answer.prototype.save = function(userId, questionId, option, is_correct, answer_msec, callback) {
    qidUidToAnswerId[questionId + '_' + userId] = option;

    var sql = 'insert into user_answer (user_id, question_id, answer, is_correct, answer_msec, created_at, updated_at) values (?, ?, ?, ?, ?, now(), now());';
    con.executeQuery(sql, [userId, questionId, option, is_correct, answer_msec], function(err, result) {
        if (err) {
            return callback(err, null);
        }


        return callback(null, true);
    });
};

