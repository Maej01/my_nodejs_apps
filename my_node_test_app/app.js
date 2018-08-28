// var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//connecting to the mongoose db
mongoose.connect('mongodb://Maej:maejdb1@ds149353.mlab.com:49353/mae_server_db');

//creating a shema - this is like a blueprint for the data
var mySchema = new mongoose.Schema({
    name: String,
    department: String,
    email: String
});

//this is the model
var form_data = mongoose.model('user_contacts', mySchema);
// var itemOne = form_data({name: 'maejor', department: 'IT', email: 'maej@tecloud.sl'}).save(function(err){
//     if (err) throw err;
//     console.log('contact saved');
// });

//body parse middle ware
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//set up template engine
app.set('view engine', 'ejs'); //enabling ejs 


//this is the  static files middle ware
app.use('/assets', express.static('assets'));

//homepage route get request
app.get('/', function(req, res){
    res.render('index');
});

//contact route get request
app.get('/contact', function(req, res){
    res.render('contact', {qs: req.query});
});

//contact route post request
app.post('/contact', urlencodedParser ,function(req, res){

    //get data from the form and save it in the database
    var newFormData = form_data(req.body).save(function(err, data){
         if(err) throw err; //throw and error if found

         // console.log(req.body);
        res.render('contact-success', {data: req.body});
        console.log('new data saved');
    });
});

// app.get('/invest', function(req, res){
//     res.send('this is the investment page');
// });

app.get('/profile/:name', function(req, res){
    var data = {age: 26, job: 'developer', hobbies: ['coding', 'playing games', 'browsing']};
    res.render('profile', {person: req.params.name, data : data});
})

app.listen(3000); //listening to a port