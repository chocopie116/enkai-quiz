var assert = require('power-assert'),
    AnswerSheet = require('../apps/lib/answer_sheet.js');

describe('answer_sheetのテスト', function () {
    it('選択肢毎の回答数が取得できる', function () {
        var questionStartNumber = 1;
        var result = [];
        result[0] = {answer: 1, answer_count: 10};
        result[1] = {answer: 2, answer_count: 200};
        result[2] = {answer: 3, answer_count: 40};
        result[3] = {answer: 4, answer_count: 14};
        var correctAnswer = 1;
        var answersheet = new AnswerSheet(questionStartNumber, result, correctAnswer);

        assert(1  === answersheet.getQuestionStartNumber());
        assert(10  === answersheet.countA());
        assert(200 === answersheet.countB());
        assert(40  === answersheet.countC());
        assert(14  === answersheet.countD());
    });

    it('選択肢に回答が0件の場合は0が返る', function () {
        var questionStartNumber = 100;
        var result = [];
        result[0] = {answer: 1, answer_count: 10};
        var correctAnswer = 1;
        var answersheet = new AnswerSheet(questionStartNumber, result, correctAnswer);

        assert(10  === answersheet.countA());
        assert(0 === answersheet.countB());
        assert(0  === answersheet.countC());
        assert(0  === answersheet.countD());
    });

    it('正答の番号を取得できる', function () {
        var questionStartNumber = 100;
        var result = [];
        result[0] = {answer: 1, answer_count: 10};
        result[1] = {answer: 2, answer_count: 200};
        result[2] = {answer: 3, answer_count: 40};
        result[3] = {answer: 4, answer_count: 14};
        var correctAnswer = 1;

        var answersheet = new AnswerSheet(questionStartNumber, result, correctAnswer);
        assert(1 === answersheet.correct());
    });

    it('問題ごとに画像パターンを指定した場合はimage-patternを返すはず', function () {
        var questionStartNumber = 2;
        var result = [];
        var correctAnswer = 1;
        var answersheet = new AnswerSheet(questionStartNumber, result, correctAnswer);
        assert('image-pattern' == answersheet.getLayoutType());
    });

    it('問題にquestionTypeを設定していない場合はtext-patternが返るはず', function () {
        var questionStartNumber = 999999;
        var result = [];
        var correctAnswer = 1;
        var answersheet = new AnswerSheet(questionStartNumber, result, correctAnswer);
        assert('text-pattern' == answersheet.getLayoutType());
    });
});
