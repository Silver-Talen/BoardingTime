const mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs');
var expressSession = require("express-session");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', {
    useNewUrlParser: true
});

const mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', (callback) => {

});

const accountSchema = mongoose.Schema({
    username: String,
    avatar_eyes: String,
    avatar_nose: String,
    avatar_mouth: String,
    password: String,
    userLevel: String,
    email: String,
    age: String,
    color: String
});

const messageSchema = mongoose.Schema({
    username: String,
    color: String,
    date: Date,
    message: String
});

var Account = mongoose.model('Account_Collection', accountSchema);
var Message = mongoose.model('Message_Collection', messageSchema);

exports.expressSession = () => ({
    secret: 'Whatever54321',
    saveUninitialized: true,
    resave: true
  });

exports.index = (req, res) => {
    Message.find((err, message) => {
        if(err) return console.error(err);
        res.render('index', {
            title: 'Message List',
            message: message
        });
    });
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Add Person'
    });
}

exports.createPerson = (req, res) => {
    var hash = bcrypt.hashSync(req.body.password);
    var regexColor = req.body.color;
    regexColor = regexColor.replace(/[#]/g, '');
    var account = new Account({
        username: req.body.username,
        age: req.body.age,
        password: hash,
        userLevel: req.body.userLevel,
        email: req.body.email,
        avatar_eyes: req.body.avatar_eyes,
        avatar_nose: req.body.avatar_nose,
        avatar_mouth: req.body.avatar_mouth,
        color: regexColor
    });
    account.save((err, account) => {
        if(err) return console.error(err);
        console.log(account.username + ' added')
    });
    res.redirect('/');
}

exports.createMessage = (req, res) => {
    //take data of whoever is logged in
}

exports.edit = (req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit',
            account: account
        });
    });
}

exports.editPerson = (req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if(err) return console.error(err);
        //edit avatar
            //color / face parameters
        //edit password
        //edit username
        account.save((err, account) => {
            if(err) return console.error(err);
            console.log(req.body.username + " updated");
        });
    });
    res.redirect('/');
}

exports.delete = (req, res) => {
    Account.findByIdAndRemove(req.params.id, (err, account) => {
        if(err) return console.error(err);
        res.redirect('/admin');
    });
}

exports.details = (req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if(err) return console.error(err);
        res.render('details', {
            title: 'Details',
            id: req.params.id,
            account: account
        });
    });
}

exports.admin = (req, res) => {
    Account.find((err, account) => {
        if(err) return console.error(err);
        res.render('admin', {
            title: 'Account List',
            account: account
        });
    });
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
}

exports.authenticateUser = (req, res) => {
    console.log(req.body.username);
    Account.find((err, account) => {
        if(req.body.username==account.username && req.body.pass==account.password){
            req.session.user={
              isAuthenticated: true,
              username: req.body.username
            };
        }
    })
      res.redirect('/');
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
          console.log(err);
        }else{
          res.redirect('/');
        }
      });
}

exports.checkAuth = function(req, res, next) {
    if(req.session.user && req.session.user.isAuthenticated){
      next();
    }else{
      res.redirect('/');
    }
  }