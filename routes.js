var mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs'),
    expressSession = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', {
    useNewUrlParser: true
});

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', function(callback){

});
//app.use(expressSession({
//    secret: 'Whatever54321',
//    saveUninitialized: true,
//    resave: true
//  }));

var accountSchema = mongoose.Schema({
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

var messageSchema = mongoose.Schema({
    username: String,
    color: String,
    date: Date,
    message: String
});

var Account = mongoose.model('Account_Collection', accountSchema);
var Message = mongoose.model('Message_Collection', messageSchema);

exports.index = function(req, res){
    Message.find(function(err, message){
        if(err) return console.error(err);
        res.render('index', {
            title: 'Message List',
            message: message
        });
    });
}

exports.create = function(req, res){
    res.render('create', {
        title: 'Add Person'
    });
}

exports.createPerson = function(req, res){
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
    account.save(function(err, account) {
        if(err) return console.error(err);
        console.log(account.username + ' added')
    });
    res.redirect('/');
}

exports.createMessage = function(req, res) {
    //take data of whoever is logged in
}

exports.edit = function(req, res){
    Account.findById(req.params.id, function(err, account){
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit',
            account: account
        });
    });
}

exports.editPerson = function(req, res){
    Account.findById(req.params.id, function(err, account){
        if(err) return console.error(err);
        //edit avatar
            //color / face parameters
        //edit password
        //edit username
        account.save(function(err, account){
            if(err) return console.error(err);
            console.log(req.body.username + " updated");
        });
    });
    res.redirect('/');
}

exports.delete = function(req, res) {
    Account.findByIdAndRemove(req.params.id, function(err, account) {
        if(err) return console.error(err);
        res.redirect('/admin');
    });
}

exports.details = function(req, res){
    Account.findById(req.params.id, function(err, account){
        if(err) return console.error(err);
        res.render('details', {
            title: 'Details',
            id: req.params.id,
            account: account
        });
    });
}

exports.admin = function(req, res){
    Account.find(function(err, account){
        if(err) return console.error(err);
        res.render('admin', {
            title: 'Account List',
            account: account
        });
    });
}

exports.login = function(req, res) {
    console.log(req.body.username);
    //check database
    if(req.body.username=='user' && req.body.pass=='password'){
      req.session.user={
        isAuthenticated: true,
        username: req.body.username
      };
      res.redirect('/');
    }
}

exports.logout = function (req, res) {
    req.session.destroy(function(err){
        if(err){
          console.log(err);
        }else{
          res.redirect('/');
        }
      });
}