var mongoose = require('mongoose');
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
    avatar: Image,
    password: String,
    userLevel: String,
    email: String,
    age: String
});

var messageSchema = mongoose.Schema({
    name: String,
    avatar: Image,
    date: Date
});

var Account = mongoose.model('Account_Collection', accountSchema);
var Message = mongoose.Model('Message_Collection', messageSchema);

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
    var person = new Account({
        name: req.body.name,
        age: req.body.age,
        species: req.body.species
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
    Account.findById(req.params.id, function(err, person){
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.save(function(err, person){
            if(err) return console.error(err);
            console.log(req.body.name + " updated");
        });
    });
    res.redirect('/');
}

exports.delete = function(req, res){
    Account.findByIdAndRemove(req.params.id, function(err, person){
        if(err) return console.error(err);
        res.redirect('/');
    });
}

exports.details = function(req, res){
    Account.findById(req.params.id, function(err, person){
        if(err) return console.error(err);
        res.render('details', {
            title: 'Details',
            id: req.params.id,
            person: person
        });
    });
}