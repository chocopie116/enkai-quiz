var Render =   Render || function () {};

/**
 * TOP１０のランキングを描画する
 */
Render.prototype.renderTop10 = function() {
    var winnerCount = 10;
    finalistStartDelay = 500,
    startDelay = 500,
    addonDelay = (finalistStartDelay - startDelay) / winnerCount;

    var acctualWinnerCount = $('#winners').data().count;
    if (acctualWinnerCount < 10) {
        winnerCount = acctualWinnerCount;
    }

    for (var i = winnerCount; i > 1; i--) {
        var data = $('#rank-data-'+i).data()

        var rank = $('.rank-'+i);
        rank.find('.rank').find('.text').append(data.rank);
        rank.find('.name').find('.text').append(data.name);
        rank.find('.count').find('.text').append(data.correct_count);
        rank.find('.time').find('.text').append(data.seconds);
        rank.find('.text').delay(startDelay + addonDelay * (10 - i)).show(1300);
    }

    $('#rank-'+1).delay(finalistStartDelay).show(3300);
    var data = $('#rank-data-'+ 1).data()
    var rank = $('.rank-'+ 1);
    rank.find('.rank').find('.text').append(data.rank);
    rank.find('.name').find('.text').append(data.name);
    rank.find('.count').find('.text').append(data.correct_count);
    rank.find('.time').find('.text').append(data.seconds);
    rank.find('.text').delay(finalistStartDelay).show(1700);
}

/**
 * TOP10以下のランキングを描画する
 */
Render.prototype.renderUnderTop10 = function() {
    var winnerCount = $('#winners').data().count,
    rankLocation,
    delay = 0,
    interval = 300;
    tableClearAddOnDelay = 1500;

    for (var i = winnerCount; i > 10; i--) {
        delay += interval;
        rankLocation = (i % 10 == 0) ? 10 : i % 10;

        var data = $('#rank-data-' + i).data()

        var rank = $('.rank-'+rankLocation);

        setTimeout(render, delay, rank, data.rank, data.name, data.correct_count, data.seconds);
        if (rankLocation == 1) {
            delay += tableClearAddOnDelay;
            setTimeout(clearRankingTable, delay);
        }
    }
}

render = function(dom, rank, name, count, time) {
    dom.find('.rank').find('.text').append(rank);
    dom.find('.name').find('.text').append(name);
    dom.find('.count').find('.text').append(count);
    dom.find('.time').find('.text').append(time);
    dom.find('.text').show(500);
}

clearRankingTable = function() {
    $(".ranking").find('.text').empty().hide();
}
