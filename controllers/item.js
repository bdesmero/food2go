var mongoose = require('mongoose');
var Category = require('../models/category');
var Item = require('../models/item');

module.exports.controller = function(app) {

    app.get('/restaurants/:resto_id/categories/:id/items/new', function(req, res){
        res.render('item/new', {restoId: req.params.resto_id,
                                    categoryId: req.params.id});
    });


    app.get('/restaurants/:resto_id/categories/:category_id/items/:id/edit', function(req, res){
        var restoId = req.params.resto_id,
            categoryId = req.params.category_id,
            itemId = req.params.id;

        Item.findOne({'_id': itemId}, function(err, item){
            res.render('item/edit', {item: item, 
                                        restoId: restoId, 
                                        categoryId: categoryId});
        });
    });


    app.get('/restaurants/:resto_id/categories/:category_id/items/:id/delete', function(req, res){
        var restoId = req.params.resto_id,
            categoryId = req.params.category_id,
            itemId = req.params.id;

        Item.remove({ '_id': itemId }, function(err){
            res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories/' + categoryId});
            res.end();
        });
    });


    app.post('/restaurants/:resto_id/categories/:id/items/new', function(req, res){
        var body = req.body,
            restoId = req.params.resto_id,
            categoryId = req.params.id;

        var item = new Item({name: body.name,
                                description: body.description,
                                price: body.price,
                                category_id: categoryId});

        item.save(function(err, item){
            console.log(item);

            res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories/' + categoryId});
            res.end();
        });
    });


    app.post('/restaurants/:resto_id/categories/:category_id/items/:id/edit', function(req, res){
        var itemId = req.params.id,
            restoId = req.params.resto_id,
            categoryId = req.params.category_id,
            body = req.body;

        var conditions = { _id: itemId }, 
            update = {$set: {name: body.name, 
                            description: body.description,
                            price: body.price}}, 
            options = { multi: true };

        Item.update(conditions, update, options, function(err, item){
            res.writeHead(302, {'Location': '/restaurants/' + restoId + '/categories/' + categoryId});
            res.end();
        });
    });

};