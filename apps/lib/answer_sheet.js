/**
 * 問毎の回答結果を保持するオブジェクト
 */
var AnswerSheet = AnswerSheet || {};

/**
 * コンストラクタ
 * @param array   results       選択肢と回答数のハッシュのリスト
 * @param integer correctAnswer 選択肢番号
 */
var AnswerSheet = function(startNumber, results, correctAnswer) {
    this.startNumber = startNumber;
    this.correctAnswer = correctAnswer;
    this.results = results;
};

module.exports = AnswerSheet;

AnswerSheet.prototype.getQuestionStartNumber = function() { return this.startNumber ;}
AnswerSheet.prototype.countA = function() { return countByAnswerNumber(this.results, 1)}
AnswerSheet.prototype.countB = function() { return countByAnswerNumber(this.results, 2)}
AnswerSheet.prototype.countC = function() { return countByAnswerNumber(this.results, 3)}
AnswerSheet.prototype.countD = function() { return countByAnswerNumber(this.results, 4)}

AnswerSheet.prototype.correct = function() {return this.correctAnswer;}

var countByAnswerNumber = function(results, number) {
    var count = 0;

    results.forEach(function(e) {
        if (e.answer == number) {
            count = e.answer_count;
        }
    });

    return count;
};

//回答結果表示画面のレイアウトを変更するため、問題ごとにpatternを持っておく
AnswerSheet.prototype.getLayoutType = function() {
    return (this.startNumber%2===1) ? "image-pattern" : "text-pattern";
};
