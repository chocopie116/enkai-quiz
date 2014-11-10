var assert = require('power-assert'),
moment = require('moment'),
Question = require('../apps/lib/question.js');

describe('questionのテスト', function () {
    it('コンストラクタでsetした値がgetできるはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:43:31'};

        var question = new Question(params);
        assert(question.getId() === 12);
        assert(question.getQuestion() === 'この中で一番背が高いのは?');
        assert(question.getCorrectAnswer() === 2);
        assert(question.getStartDate() === '2014/08/02 13:43:31');
    });

    it('[現在時刻を指定]問題開始してから5秒の場合5000(msec)が返るはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:43:31'};

        var question = new Question(params);
        var now = moment('2014-08-02 13:43:36');
        assert(5000 === question.msecSinceOpened(now));
    });

    it('引数がYYYY-MM-DD HH:mm:ss SSSの形式でも問題なくパースできる', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014-08-02 13:43:31 123'};
        var question = new Question(params);
        var now = moment('2014-08-02 13:43:36 124', 'YYYY/MM/DD HH:mm:ss SSS');
        assert(5001 === question.msecSinceOpened(now));
    });

    it('[現在時刻指定なし]問題開始してからの経過秒(msec)の数字が返るはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:43:31'};

        var question = new Question(params);

        var result = question.msecSinceOpened();
        assert(false  === isNaN(question.msecSinceOpened()));
    });

    it('11秒を経過した場合は、falseが返るはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:00:00'};

        var question = new Question(params);
        var now = '2014/08/02 13:00:11';
        assert(false === question.isOpen(now));
    });

    it('9秒経過した場合は、trueが返るはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:43:31'};

        var question = new Question(params);
        var now = '2014/08/02 13:00:09';
        assert(true === question.isOpen(now));
    });

    it('10秒ちょうど経過した場合は、falseが返るはず', function () {
        var params = {question_id: 12, question: 'この中で一番背が高いのは?', correct_answer: 2, start_date: '2014/08/02 13:00:00'};

        var question = new Question(params);
        var now = '2014/08/02 13:00:10 012';
        assert(false === question.isOpen(now));
    });
});
