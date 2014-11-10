var con = require('./connection'),
    Question = require('./question'),
    AnswerSheet = require('../lib/answer_sheet');

/**
 * クイズモデルの生成を扱うクラス
 */
var QuizMaster = function() {
};
var currentQuestion;

module.exports = QuizMaster;

QuizMaster.prototype.getCurrentQuestion = function() {
    return currentQuestion;
};

/**
 * 問題を開始する(=回答可能状態にする)
 */
QuizMaster.prototype.start = function(questionId, callback) {
    var sql = 'update question set start_date = now() where question_id = ?;';
    con.executeQuery(sql, [questionId], function(err, result) {
        if (err) {
            return callback(err, null);
        }

        return callback(null, true);
    });
}


/**
 * 最新の問題を取得する
 */
QuizMaster.prototype.getLatest = function(isOpen, callback) {
    if (isOpen) {
        return callback(null, currentQuestion);
    }

    var sql = 'select * from question where start_date is not null order by start_number desc limit 1';
    con.executeQuery(sql, function(err, result) {
        if (err) {
            return callback(err);
        }

        if (result.length == 0) {
            return callback(null, null);
        }

        //Questionモデルを生成する
        currentQuestion = new Question(result[0]);
        return callback(null, currentQuestion);
    });

}

QuizMaster.prototype.getAnswerSheet = function(questionId, callback) {
    var sql = 'select *  from question where question_id = ?';
    con.executeQuery(sql, [questionId], function(err, result) {
        if (err) {
            return callback(err, null);
        }


        console.log('-----回答結果の集計結果----');
        console.log(result);

        if (result.length == 0) {
            return callback(null, null);
        }

        var question = new Question(result[0]);

        var sql = 'select answer, count(*) as answer_count from user_answer where question_id = ? group by answer;';

        con.executeQuery(sql, [questionId], function(err, result) {
            console.log('-----回答結果の集計結果----');
        console.log(result);
            if (err) {
                return callback(err, null);
            }

            if (result.length == 0) {
                return callback(null, null);
            }

            var answerSheet = new AnswerSheet(question.getStartNumber(), result, question.getCorrectAnswer());

            return callback(null, answerSheet);
        });
    });
}

