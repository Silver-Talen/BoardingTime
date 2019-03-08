const express = require('express'),
pug = require('pug'),
path = require('path'),
routes = require('./routes.js'),
bodyParser = require('body-parser');

var app = express();

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated){
      next();
    }else{
      res.redirect('/');
    }
  }

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);

app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);

app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);

app.get('/delete/:id', routes.delete);

app.get('/details/:id', routes.details);

app.get('/admin', routes.admin);

app.get('/logout', routes.logout);
app.post('/login',urlencodedParser, routes.login);

app.listen(3000);