var con = require('./connection');

var Ranking = function() {
};

module.exports = Ranking;

Ranking.prototype.getQuestionWorst = function(questionId, callback) {
    var sql = '\
        select \
            @i:=@i+1 AS rank, \
            um.user_name as name, \
            round(answer.answer_msec/1000, 1) as seconds \
        from \
        (SELECT @i:=0) as INDEX_NUM, \
        (select user_id, answer_msec from user_answer where question_id = ? and is_correct = 1 order by answer_msec desc limit 10)answer \
        inner join user_master um on answer.user_id = um.user_id\
        order by seconds \
        \
        ';

    con.executeQuery(sql, [questionId], function(err, result) {
        if (err) {
            return callback(err, null);
        }

        if (result.length == 0) {
            return callback(null, []);
        }

        return callback(null, result);
    });
};

Ranking.prototype.getUserBest = function(callback) {
    /**
     * 正解のうち
     * ペナルティではないもの(正解者の中で一番遅い人)
     * question_id = 1より大きいもの(最初のチャレンジ問題除く)
     */
    var sql = '\
        select\
            @I:= @i+1 as rank,\
            ranking.user_name as name,\
            ranking.correct_answer_count as correct_count,\
            round(ranking.correct_answer_msec/1000, 1) as answer_time\
        from\
        (SELECT @i:=0) as INDEX_NUM,\
        (\
        select\
            ua.user_id,\
            um.user_name,\
            count(*) as correct_answer_count, \
            sum(ua.answer_msec)  as correct_answer_msec\
        from user_answer ua inner join user_master um on ua.user_id = um.user_id\
        where ua.question_id > 1\
        and ua.is_correct = 1\
        and ua.is_penalty = 0\
        group by ua.user_id\
        order by correct_answer_count desc, correct_answer_msec\
        limit 50\
        ) ranking;\
        ';

    con.executeQuery(sql, function(err, result) {
        if (err) {
            return callback(err, null);
        }

        if (result.length == 0) {
            return callback(null, []);
        }

        return callback(null, result);
    });
};

