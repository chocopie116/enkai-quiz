var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.runSql('CREATE TABLE `user_master` ('
                + '`user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,'
                + '`user_name` varchar(255) NOT NULL UNIQUE,'
                + '`session` varchar(255) NOT NULL UNIQUE,'
                + "`correct_answer_count` int(10) unsigned NOT NULL comment '正答数のサマリ',"
                + "`correct_answer_msec` BIGINT unsigned NOT NULL comment '正解した問題に絞った回答時間のサマリ',"
                + '`created_at` datetime NOT NULL,'
                + '`updated_at` datetime NOT NULL,'
                + 'PRIMARY KEY (`user_id`)'
                + ') ENGINE=InnoDB AUTO_INCREMENT=566 DEFAULT CHARSET=utf8;', callback);
};

exports.down = function(db, callback) {
    db.runSql('DROP TABLE user_master;', callback);
};
