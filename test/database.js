var assert = require('power-assert'),
    database = require('../apps/lib/database');

describe('database', function () {
    describe('getConnection', function () {
        it('connectionが生成できるはず', function () {
            var con = database.getConnection();
            assert(con !== null); //TODO assertionをちゃんとやる
        });
    });
});

