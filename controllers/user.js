var mongoose = require('mongoose');
var User = require('../models/user');
var Restaurant = require('../models/restaurant');

module.exports.controller = function(app) {

    app.get('/users', function(req, res){ 
        User.find(function(err, results){
            console.log(results);
            res.render('user/index', {users: results});
        });
    });


    app.get('/users/new', function(req, res){ 
        res.render('user/new');
    });


    app.get('/users/:id', function(req, res){ 
        var userId = req.params.id;

        User.findOne({ '_id': userId }, function (err, user) {
            res.render('user/show', user);
        });
    });


    app.get('/users/:id/edit', function(req, res){ 
        var userId = req.params.id;

        User.findOne({ '_id': userId }, function (err, user) {
            res.render('user/edit', user);
        });
    });
    

    app.get('/users/delete/:id', function(req, res){  });


    app.post('/users/new', function(req, res){ 
        var body = req.body;

        var user = new User({email: body.email, 
                            password: body.password,
                            name: body.name,
                            type: 'owner'});

        user.save(function(err, user){
            console.log(user);

            res.writeHead(302, {'Location': '/users/' + user._id});
            res.end();
        });
    });
    

    app.post('/users/:id/edit', function(req, res){
        var userId = req.params.id,
            body = req.body;

        var conditions = { _id: userId }, 
            update = {$set: {email: body.email, 
                            password: body.password,
                            name: body.name}}, 
            options = { multi: true };

        User.update(conditions, update, options, function(err, user){
            res.writeHead(302, {'Location': '/users/' + userId});
            res.end();
        });
    });



    app.get('/users/:id/restaurants', function(req, res){
        Restaurant.find({ 'owner_id': req.params.id }, function (err, results) {
            res.render('restaurant/index', {restos : (results == undefined ? [] : restos)});
        });
    });


    app.post('/users/login', function(req, res){
        var body = req.body;

        User.findOne({ 'email': body.email, 'password': body.password }, function (err, user) {
            if(user != null){ 
                currUser = user;
                res.writeHead(302, {'Location': '/home'}); 
            }
            else { res.writeHead(302, {'Location': '/'}); }
            res.end();
        });
    });

};
