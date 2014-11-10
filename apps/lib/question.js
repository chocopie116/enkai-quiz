var moment = require('moment'),
    timeLimitMsec = 15000; //回答上限(10秒)

/**
 * クイズのエンティティモデル
 */
var Question = function(params) {
    this.id = params.question_id;
    this.question = params.question;
    this.correct_answer = params.correct_answer;
    this.start_date = params.start_date;
    this.start_number = params.start_number;
};

module.exports = Question;

//getter
Question.prototype = {
    getId: function() { return this.id; },
    getQuestion: function() { return this.question; },
    getCorrectAnswer: function() {return this.correct_answer;},
    getStartDate: function() {return this.start_date;},
    getStartNumber: function() {return this.start_number;}
};

//現在回答受付期間か
Question.prototype.isOpen = function(datetimeString) {
    var now;
    if (datetimeString) {
        now = moment(datetimeString, 'YYYY/MM/DD HH:mm:ss SSS');
    } else {
        now = moment();
    }
    console.log('回答開始からの経過秒数(msec)');
    console.log(this.msecSinceOpened(now)); //回答受付秒数 > 実際の経過秒数ならtrue

    return timeLimitMsec > this.msecSinceOpened(now); //回答受付秒数 > 実際の経過秒数ならtrue
};

//問題が公開されてからの経過秒数を返す
Question.prototype.msecSinceOpened = function(datetimeString) {
    var now,
        start_date = moment(this.start_date, 'YYYY/MM/DD HH:mm:ss SSS');

    if (datetimeString) {
        now = moment(datetimeString, 'YYYY/MM/DD HH:mm:ss SSS');
    } else {
        now = moment();
    }

    return (now.unix() * 1000 + now.milliseconds()) - (start_date.unix() * 1000 + start_date.milliseconds());
};

