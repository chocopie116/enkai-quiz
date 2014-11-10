var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.runSql('CREATE TABLE `answer_penalty_log` ('
                + '`id` int(10) unsigned NOT NULL AUTO_INCREMENT,'
                + '`user_id` int(10) unsigned NOT NULL,'
                + '`question_id` int(10) unsigned NOT NULL UNIQUE,'
                + '`created_at` datetime NOT NULL,'
                + '`updated_at` datetime NOT NULL,'
                + '`deleted_at` datetime DEFAULT NULL,'
                + 'PRIMARY KEY (`id`)'
                + ') ENGINE=InnoDB DEFAULT CHARSET=utf8;', callback);
};

exports.down = function(db, callback) {
    db.runSql('DROP TABLE question;', callback);
};
