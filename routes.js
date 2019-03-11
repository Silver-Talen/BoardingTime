const mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs');

var activeSession = false;
var username = "";

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
    date: Date,
    message: String
});

var Account = mongoose.model('Account_Collection', accountSchema);
var Message = mongoose.model('Message_Collection', messageSchema);

exports.index = (req, res) => {
    Message.find((err, message) => {
        if(err) return console.error(err);
        res.render('index', {
            "title": 'Message List',
            "message": message,
            "session": activeSession,
            "username": username
        });
    });
}

exports.create = (req, res) => {
    res.render('create', {
        "title": 'Add Person',
        "session": activeSession
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
    Account.find({username: req.body.username}, (err, account) => {
        if(err) console.error(err);
        if(req.body.username==account[0].username && bcrypt.compareSync(req.body.password, account[0].password)){
            activeSession = true;
            req.session.user={
              isAuthenticated: true,
              username: req.body.username,
            };
            console.log(req.session);
            console.log(req.session.user.username);
            username = req.session.user.username;
        }
        else{
            console.log("Not authenticated");
        }
    });
    res.redirect('/');
}

exports.account = (req, res) => {
    //var user = Account.findOne({username: username});
    //user.exec(function (err, person) {
    //    if (err) return handleError(err);
    //    console.log("-------------------");
    //    console.log(person.avatar_eyes);
    //});
    res.render('account', {
        title: 'Account',        
        avatar_eyes: '',//user.avatar_eyes,
        avatar_mouth: '',
        avatar_nose: '',
        avatar_color: ''
    });
}

exports.logout = (req, res) => {
    console.log(req.session);
    req.session.destroy((err) => {
        username = "";
        activeSession = false;
        if(err){
          console.log(err);
        }else{
            console.log("Session destroyed");
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