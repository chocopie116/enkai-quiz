var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.runSql('CREATE TABLE `user_answer` ('
                + '`id` int(10) unsigned NOT NULL AUTO_INCREMENT,'
                + '`user_id` int(10) unsigned NOT NULL,'
                + '`question_id` int(10) unsigned NOT NULL,'
                + '`answer` int(1) unsigned NOT NULL,'
                + "`is_correct` int(10) unsigned NOT NULL comment '正答したかどうか',"
                + "`answer_msec` BIGINT unsigned NOT NULL comment '回答にかかった時間',"
                + "`is_penalty` int(1) unsigned default 0  NOT NULL comment '正答した中で一番遅かったら1がつく1は最終ランキングでは集計されない',"
                + '`created_at` datetime NOT NULL,'
                + '`updated_at` datetime NOT NULL,'
                + 'PRIMARY KEY (`id`)'
                + ') ENGINE=InnoDB AUTO_INCREMENT=566 DEFAULT CHARSET=utf8 ;', createIndex);

    function createIndex(err) {
        if (err) {
            return console.log(err);
        }
        db.runSql('create unique index user_answer_idx01 on user_answer (user_id, question_id);', callback);
    }
};

exports.down = function(db, callback) {
    db.runSql('DROP TABLE user_answer;', callback);
};
