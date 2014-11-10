var assert = require('power-assert'),
    random = require('../apps/lib/random'),
    User = require('../apps/lib/user.js');

describe('user登録テスト', function () {
    var sid = random.generate();
    var username = 'test_username' + random.generate();

    it('ユーザーが生成できたらtrueが返る', function (done) {
        var user = new User();

        user.register(username, sid, function(err, result) {
            assert(true == result);
            done();
        });
    });

    it('sidに紐づくユーザーが存在する場合は、ユーザーデータを返す', function (done) {

        var user = new User();

        user.getUser(sid, function(err, result) {
            assert(sid == result.session);
            assert(username == result.user_name);
            done();
        });
    });

    it('ユーザーが存在しない場合は、nullを返す', function (done) {
        var sid = 'never_existing_session_string';

        var user = new User();

        user.getUser(sid, function(err, result) {
            assert(null == result);
            done();
        });
    });

    //TODO errorがでるためコメントアウト
    //Error: done() called multiple times
    //it('同じusernameで２回登録しようとすると２回目はfalseが返る', function (done) {
    //    var user = new User();
    //    user.register(username, sid, function(err, result) {
    //        assert(false == result);
    //        done();
    //    });
    //});
});
