var random = require('../lib/random'),
    User = require('../lib/user');

/**
 * ユーザー登録画面
 */
exports.index = function(req, res) {
    res.render('user/signup');
};

/**
 * ユーザー登録処理
 */
exports.register= function(req, res) {
    // Cookieを設定する
    var username = req.body.username;

    if (!username) {
        return console.log('[パラメータエラー] usernameが空です。');
    }

    var sid = random.generate();
    var user = new User();
    //登録する
    user.register(username, sid, function(err, result) {
        if (err) {
            //500エラー失敗
            return console.log('登録エラー' + err);
        }

        if (!result) {
            //重複エラー
            return res.render('user/signup', {error: '既にその名前は使われています。'});
        }

        res.cookie('sid', sid);
        res.redirect('/');
    });
};
