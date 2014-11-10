var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.runSql('CREATE TABLE `question` ('
                + '`question_id` int(10) unsigned NOT NULL AUTO_INCREMENT,'
                + "`start_number` int(10) unsigned NOT NULL comment '問題の開始順序',"
                + '`question` varchar(255) NOT NULL,'
                + "`correct_answer` int(10) unsigned NOT NULL comment '正答の番号',"
                + "`start_date` datetime comment '問題の開始時刻',"
                + '`created_at` datetime NOT NULL,'
                + '`updated_at` datetime NOT NULL,'
                + '`deleted_at` datetime DEFAULT NULL,'
                + 'PRIMARY KEY (`question_id`)'
                + ') ENGINE=InnoDB DEFAULT CHARSET=utf8;', callback);
};

exports.down = function(db, callback) {
    db.runSql('DROP TABLE question;', callback);
};
