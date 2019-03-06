var mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', {
    useNewUrlParser: true
});

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', function(callback){

});

var accountSchema = mongoose.Schema({
    username: String,
    avatar_eyes: String,
    avatar_nose: String,
    avatar_mouth: String,
    password: String,
    userLevel: String,
    email: String,
    age: String
});

var messageSchema = mongoose.Schema({
    username: String,
    avatar_eyes: String,
    avatar_nose: String,
    avatar_mouth: String,
    avatar_color: String,
    date: Date
});

var Account = mongoose.model('Account_Collection', accountSchema);
var Message = mongoose.model('Message_Collection', messageSchema);

exports.index = function(req, res){
    Account.find(function(err, person){
        if(err) return console.error(err);
        res.render('index', {
            title: 'Account List',
            people: person
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
    var person = new Account({
        username: req.body.username,
        age: req.body.age,
        password: hash,
        userLevel: req.body.userLevel,
        email: req.body.email,
        avatar_eyes: req.body.avatar.avatar_eyes,
        avatar_nose: req.body.avatar.avatar_nose,
        avatar_mouth: req.body.avatar.avatar_mouth
    });
    person.save(function(err, person){
        if(err) return console.error(err),
        console.log(person.name + ' added')
    });
    res.redirect('/');
}

exports.edit = function(req, res){
    Account.findById(req.params.id, function(err, person){
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit',
            person: person
        });
    });
}

exports.editPerson = function(req, res){
    Account.findById(req.params.id, function(err, account){
        if(err) return console.error(err);
        //edit avatar
        //edit password
        //edit username
        account.save(function(err, person){
            if(err) return console.error(err);
            console.log(req.body.name + " updated");
        });
    });
    res.redirect('/');
}

exports.delete = function(req, res){
    Account.findByIdAndRemove(req.params.id, function(err, account){
        if(err) return console.error(err);
        res.redirect('/');
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
    Person.find(function(err, acount){
        if(err) return console.error(err);
        res.render('admin', {
            title: 'People List',
            acount: acount
        });
    });
}