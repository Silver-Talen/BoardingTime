const express = require('express'),
pug = require('pug'),
path = require('path'),
routes = require('./routes.js'),
bodyParser = require('body-parser');

var expressSession = require("express-session");

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));
app.use(expressSession({
    secret: 'Whatever54321',
    saveUninitialized: true,
    resave: true
}));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);
app.post('/', urlencodedParser, routes.createMessage);
app.get('/editMessage', routes.editMsg)
app.post('/editMessage/:id', urlencodedParser, routes.editMessage);
app.get('/deleteMessage/:id', routes.deleteMessage);

app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);

app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.authenticateUser);

app.get('/logout', routes.logout);

app.get('/account', routes.account);
app.get('/edit', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);

app.get('/admin', routes.admin);
app.get('/delete/:id', routes.delete);

app.listen(3000);