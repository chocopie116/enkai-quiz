var Ranking = require('../lib/ranking');

var ranking = new Ranking();

//問毎の、正解・早押しランキング
exports.question = function(req, res) {
    var questionId = req.param('question_id');
    if (!questionId) {
        return console.log('questionIdが指定されていません');
    }

    ranking.getQuestionWorst(questionId, function(err, result) {
        if (err) {
            return console.log(err);
        }

        if (result.length == 0) {
            console.log('回答がありません');
            result = {};
        }
        console.log(result);


        res.render('staff/question_ranking', {ranking: result, questionId: questionId});
    });
};


//全部の問題正解数ランキング
exports.user = function(req, res) {
    //正答数が多く、回答時間が短い上位50人を抽出
    ranking.getUserBest(function(err, result) {
        if (err) {
            return console.log(err);
        }

        if (result.length == 0) {
            console.log('回答がまだありません');
            result = {};
        }
        console.log(result);

        res.render('staff/user_ranking', {ranking: result});
    });
};

