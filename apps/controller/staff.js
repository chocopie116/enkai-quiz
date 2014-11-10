var con = require('../lib/connection'),
    moment = require('moment'),
    Penalty = require('../lib/penalty'),
    QuizMaster = require('../lib/question_master');

var quizMaster = new QuizMaster();
var penalty = new Penalty();

/**
 * 管理者の機能(実際にスクリーンにも映らない・ユーザーも触れない機能)
 */
exports.index = function(req, res) {
    con.executeQuery('select * from question;', function(err, result) {
        if (err) {
            console.error(err);
            return res.send('予期せぬエラーがおこりました');
        }
        res.render('staff/index', {
            questions: result
        });
    });
};

exports.open = function(req, res) {
    var questionId = req.param('question_id');
    if (!questionId) {
        return console.log(err);
    }

    quizMaster.start(questionId, function(err, result) {
        if (err) {
            res.send('予期せぬエラーがおこりました');
            return console.log(err);
        }
        console.log('[問題開始] question_id => ' + questionId  + ', start_date =>'+ moment().format('YYYY/MM/DD HH:mm:ss'));

        res.redirect('/staff/question');
    });
};


/**
 * 問題毎の回答数を表示
 */
exports.answerCheck = function(req, res) {
    var questionId = req.param('question_id');
    if (!questionId) {
        var message = 'パラメータが不足しています';
        console.log(message);
        return res.send(message);
    }


    quizMaster.getAnswerSheet(questionId, function(err, result) {
        if (err) {
            console.error(err);
            return res.send('予期せぬエラーがおこりました');
        }

        if (!result) {
            console.log('question_idに紐づく回答データはありません');
            return res.send('まだ回答データがありません。');
        }

        res.render('staff/answer_check', {answerSheet: result});
    });
};

//正解者の中でイチバン回答が遅かった人の正答数を1減らす
exports.imposePenalty = function(req, res) {
    var questionId = req.param('question_id');

    if (!questionId) {
        console.log('該当するquestionIdがありません');
        return res.send('該当するquestionIdはありません');
    }

    penalty.impose(questionId, function(err, result) {
        if (err) {
            console.error(err);
            return res.send('予期せぬエラーがおこりました');
        }

        console.log('正答数を減らしました');
        return res.send('正答数を減らしました');
    });
};
