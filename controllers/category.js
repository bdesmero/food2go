var mongoose = require('mongoose');
var ObjectId = require('mongojs').ObjectId;

var User = require('../models/user');
var Category = require('../models/category');
var Item = require('../models/item');

module.exports.controller = function(app) {

    app.get('/restaurants/:id/categories', function(req, res){
        var restoId = req.params.id;

        console.log(restoId);

        /*
        User.findOne({_id: currUser.id},
                    {restaurants: {$elemMatch: {_id: ObjectId(restoId)}}},
                    function(err, result){
                        res.render('category/index', {categories: result.restaurants[0].categories,
                                                        restoId: restoId});
                    });*/

        Category.find({'restaurant_id': restoId}, function(err, results){
            res.render('category/index', {categories: (results ? results : []),
                                            restoId: restoId});
        });
    });


    app.get('/restaurants/:id/categories/new', function(req, res){
        res.render('category/new', {restoId: req.params.id});
    });


    app.get('/restaurants/:resto_id/categories/:id', function(req, res){
        var restoId = req.params.resto_id,
            categoryId = req.params.id;

        Category.findOne({ '_id': categoryId }, function (err, category) {

            Item.find({'category_id': category.id}, function(err, results){
                res.render('category/show', {category: category, 
                                                items: (results ? results : [])});
            });

        });

    });


    app.get('/restaurants/:resto_id/categories/:id/edit', function(req, res){
        var categoryId = req.params.id;

        Category.findOne({ '_id': categoryId }, function (err, category) {
            res.render('category/edit', category);
        });
    });


    app.get('/restaurants/:resto_id/categories/:id/delete', function(req, res){
        var restoId = req.params.resto_id;
            categoryId = req.params.id;

        Item.remove({category_id: categoryId}, function(err){
            Category.remove({ '_id': categoryId }, function(err){
                res.writeHead(302, {'Location': '/restaurants/' + restoId});
                res.end();
            });
        });
    });


    app.post('/restaurants/:id/categories/new', function(req, res){
        var body = req.body,
            restoId = req.params.id;

        var category = new Category({name: body.name,
                                    restaurant_id: restoId});

        /*
        User.update({_id: currUser.id,
                    restaurants: {$elemMatch: {_id: ObjectId(restoId)}}},
                    {$push: {'restaurants.$.categories': {name: body.name}}},
                    function(err, category){
                        res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories'});
                        res.end();
                    });*/
        
        category.save(function(err, category){
            res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories'});
            res.end();
        });
    });


    app.post('/restaurants/:resto_id/categories/:id/edit', function(req, res){
        var restoId = req.params.resto_id,
            categoryId = req.params.id,
            body = req.body;

        var conditions = { _id: categoryId }, 
            update = {$set: {name: body.name}}, 
            options = { multi: true };

        
        Category.update(conditions, update, options, function(err, category){
            res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories/' + categoryId});
            res.end();
        });
    });

};