var async = require('async'),
moment = require('moment'),
User = require('../lib/user'),
Answer = require('../lib/answer'),
QuizMaster = require('../lib/question_master');

answer = new Answer();
quizMaster = new QuizMaster();
/**
 * 回答画面
 */
exports.getAnswer = function(req, res) {
    var session_id = req.cookies.sid;
    if (!session_id) {
        res.redirect('/user/signup');
    }

    res.render('question/answer', {
        sid : session_id
    });
}


exports.postAnswer = function(req, res) {
    var sid = req.body.sid;
    var option = req.body.option;
    var requestTimeString = moment().format('YYYY/MM/DD HH:mm:ss SSS');


    if (!sid || !option) {
        return res.json({code:'ng'});
    }

    var task = {};
    task.isLogin = function(callback) {
        var user = new User();
        user.getUser(sid, function(err, user) {
            if (err) {
                return callback(err, null);
            }

            if (user.length == 0) {
                return callback('ユーザーが存在しません', null);
            }
            return callback(null, user);
        });
    };

    task.getQuestion = function(user, callback) {
        var currentQuestion = quizMaster.getCurrentQuestion();
        var isOpen = currentQuestion && currentQuestion.isOpen(requestTimeString);

        //現在の問題を取得する
        quizMaster.getLatest(isOpen, function(err, question) {
            if (err) {
                return callback(err, null);
            }

            if (!question) {
                return callback('まだクイズは始まっていません', null);
            }

            if (!question.isOpen(requestTimeString)) {
                return callback('現在回答受付時間外です。', null);
            }

            return callback(null, user, question);
        });
    };

    task.hasAnswered = function(user, question, callback) {
        //ユーザーが回答済みかどうかチェックする
        answer.hasAnswered(user.user_id, question.getId(), function(err, hasAnswered) {
            if (err) {
                return callback(err, null);
            }

            if (hasAnswered) {
                return callback('この問題は回答済みです', null);
            }

            return callback(null, user, question);
        });
    };

    task.process = function(user, question, callback) {
        //回答処理を行う
        var is_correct = (question.getCorrectAnswer() == option) ? 1 : 0;
        var answer_msec = question.msecSinceOpened(requestTimeString);

        //回答の保存
        answer.save(user.user_id, question.getId(), option, is_correct, answer_msec, function(err, result) {
            console.log('[回答しました] user_id => ' + user.user_id + 'question_id =>' + question.getId());
            if (err) {
                //ここは非同期処理
                return console.log(err);
            }
        });

        return callback(null, true);
    };

    //同期的に実行する
    async.waterfall([
        task.isLogin,
        task.getQuestion,
        task.hasAnswered,
        task.process,
    ], function (err, result) {
        if (err) {
            console.log('回答失敗');
            console.log(err);
            return res.json({code:'ng'});
        }

        console.log('回答完了');
        return res.json({code:'ok'});
    });
}

