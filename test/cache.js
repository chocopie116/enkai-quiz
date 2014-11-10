var assert = require('power-assert'),
cache = require('../apps/lib/cache');

describe('cache', function () {
    describe('load', function () {
        it('cacheのインスタンスが生成できるはず', function () {
            var client = cache.load();
            assert(client !== null); //TODO assertionをちゃんとやる
        });
    });
});

describe('cache', function () {
    it('loadしたclientにsetとgetができるはず', function () {
        var client = cache.load();
        var key = 'test_cache_js';
        var value = 'sample';

        client.set(key, value, function(){});

        client.get(key, function(err, val){
            if (err) return console.log(err);
            assert(val === value);
        });
    });
});

