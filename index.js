var express = require('express'),
    http = require('http'),
    path = require('path'),
    ECT = require('ect'),
    cookieParser = require('cookie-parser'),
    bodyParser= require('body-parser'),
    morgan = require('morgan'),
    basicAuth = require('basic-auth-connect');

var app = module.exports = express();

//configuration
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ect');
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect'}).render);
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//controller
var homeController = require('./apps/controller/home'),
    userController = require('./apps/controller/user'),
    questionController = require('./apps/controller/question'),
    staffController = require('./apps/controller/staff'),
    rankingController = require('./apps/controller/ranking');

app.get('/', homeController.index);
app.get('/debug', homeController.getDebug);
app.get('/user/signup', userController.index);
app.post('/user/signup', userController.register);
app.get('/question/answer', questionController.getAnswer);
app.post('/question/answer', questionController.postAnswer);


//Basic認証
app.all('/staff/*', basicAuth(function(user, password) {
  return user === 'username-you-like' && password === 'password-you-like';
}));

app.get('/staff/question', staffController.index);
app.get('/staff/question/:question_id/answer', staffController.answerCheck);
app.get('/staff/question/:question_id/penalty', staffController.imposePenalty);
app.get('/staff/question/:question_id/open', staffController.open);
app.get('/staff/question/:question_id/ranking', rankingController.question);
app.get('/staff/question/ranking', rankingController.user);


server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

