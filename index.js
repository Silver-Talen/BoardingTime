var express = require('express'),
pug = require('pug'),
path = require('path'),
routes = require('./routes.js'),
bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);

app.get('/create', route.create);
app.post('/create', urlencodedParser, route.createPerson);

app.get('/edit/:id', route.edit);
app.post('/edit/:id', urlencodedParser, route.editPerson)

app.get('/delete/:id', route.delete);

app.get('/details/:id', route.details);

app.listen(3000);