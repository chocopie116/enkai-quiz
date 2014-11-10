exports.index = function(req, res) {
    var session_id = req.cookies.sid;

    res.render('top', {
        sid : session_id
    });
};

exports.getDebug = function(req, res) {
    var session_id = req.cookies.sid;

    res.render('top_debug', {
        sid : session_id
    });
};
