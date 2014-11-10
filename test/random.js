var assert = require('power-assert'),
    random = require('../apps/lib/random.js');

describe('random', function () {
    describe('generate', function () {
        it('32文字の擬似乱数が生成できるはず', function () {
            var randomString = random.generate();
            assert(randomString.length === 32);
        });
    });
});

