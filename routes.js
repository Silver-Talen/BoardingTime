const mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs');

var activeSession = false;
var username = "";
var userLevel = "";

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
        "title": 'Add Person'
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
        color: regexColor,
        //userLevel: "admin"
        userLevel: "default"
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
    var query = Account.findOne({username: username}, (err, user) => {
        if (err) return handleError(err);
        console.log(user.avatar_eyes);
        res.render('edit', {
            title: 'Edit',
            "session": activeSession,
            user_id: user._id,
            avatar_eyes: user.avatar_eyes,
            avatar_mouth: user.avatar_eyes,
            avatar_nose: user.avatar_eyes,
            avatar_color: user.color,
            username: user.username,
            age: user.age,
            email: user.email
        });
    });
}

exports.editPerson = (req, res) => {
    var query = Account.findOne({username: username}, (err, user) => {
        if (err) return handleError(err);
        var hash = bcrypt.hashSync(req.body.password);
        var regexColor = req.body.color;
        regexColor = regexColor.replace(/[#]/g, '');
        user.username = req.body.username;
        user.age = req.body.age;
        user.password = hash;
        user.userLevel = req.body.userLevel;
        user.email = req.body.email;
        user.avatar_eyes = req.body.avatar_eyes;
        user.avatar_nose = req.body.avatar_nose;
        user.avatar_mouth = req.body.avatar_mouth;
        user.color = regexColor;
        res.redirect('/account');
    });
}

exports.delete = (req, res) => {
    Account.findByIdAndRemove(req.params.id, (err, account) => {
        if(err) return console.error(err);
        res.redirect('/admin');
    });
}

exports.admin = (req, res) => {
    Account.find((err, account) => {
        if(err) return console.error(err);
        res.render('admin', {
            title: 'Account List',
            account: account,
            "session": activeSession,
            "userLevel": userLevel
        });
    });
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login',
        "session": activeSession
    });
}

exports.authenticateUser = (req, res) => {
    try {
        Account.find({username: req.body.username}, (err, account) => {
            if(err) console.error(err);
            if(req.body.username==account[0].username && bcrypt.compareSync(req.body.password, account[0].password)){
                activeSession = true;
                req.session.user={
                  isAuthenticated: true,
                  username: req.body.username,
                };
                username = req.session.user.username;
                userLevel = account[0].userLevel;
            }
            else{
                console.log("Not authenticated");
            }
        });
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
        alert("Gage EEEEE Boy couldn't find your username or password.");
    }
}

exports.account = (req, res) => {
    var query = Account.findOne({username: username}, (err, user) => {
        if (err) return handleError(err);
        console.log("Acount-------------");
        console.log(user);
        console.log("-------------------");
        res.render('account', {
            title: 'Account',        
            avatar_eyes: user.avatar_eyes,
            avatar_mouth: user.avatar_mouth,
            avatar_nose: user.avatar_nose,
            avatar_color: user.color,
            username: user.username,
            age: user.age,
            email: user.email
        });
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