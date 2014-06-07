var mongoose = require('mongoose');
var ObjectId = require('mongojs').ObjectId;

var User = require('../models/user');
var Restaurant = require('../models/restaurant');
var Category = require('../models/category');
var Item = require('../models/item');

module.exports.controller = function(app) {

    app.get('/restaurants', function(req, res){
        if(currUser != null){
            /*
            User.findOne({_id : currUser.id}, function(err, user){
                res.render('restaurant/index', {restos: user.restaurants});
            });*/

            
            Restaurant.find({'owner_id': currUser._id}, function(err, results){
                res.render('restaurant/index', {restos: results});
            });
        }
        else {
            Restaurant.find(function(err, results){
                res.render('restaurant/index', {restos: results});
            });
        }
    });
    

    app.get('/restaurants/new', function(req, res){
        res.render('restaurant/new');
    });


    app.get('/restaurants/:id', function(req, res){
        var restoId = req.params.id;

        /*
        User.findOne({type: 'owner'}, {restaurants: {$elemMatch: {_id: ObjectId(restoId)}}}, function(err, result){
            res.render('restaurant/show', result.restaurants[0]);
        });*/

        
        Restaurant.findOne({_id: restoId}, function(err, resto){
            Category.find({restaurant_id: restoId}, function(err, categories){

                var categoriesIds = [];
                for(var i=0; i<categories.length; i++){
                    categoriesIds.push(categories[i]._id);
                }

                Item.find({category_id: {$in: categoriesIds}}, function(err, items){
                    while(items.length > 0){
                        var item = items.pop();
                        
                        for(var j=0;j<categories.length;j++){
                            var catId = categories[j]._id;

                            if(item.category_id == catId){
                                console.log('PUSH');
                                categories[j].items.push(item);
                            }
                        }
                    }

                    res.render('restaurant/show', {resto: resto, categories: categories, items: items});
                })
            });
        });
    });


    app.get('/restaurants/:id/edit', function(req, res){
        var restoId = req.params.id;

        /*
        User.findOne({type: 'owner'}, 
                    {restaurants: {$elemMatch: {_id: ObjectId(restoId)}}}, 
                    function(err, result){
                        res.render('restaurant/edit', result.restaurants[0]);
                    });*/

        
        Restaurant.findOne({ '_id': restoId }, function (err, resto) {
            res.render('restaurant/edit', resto);
        });
    });
    

    app.get('/restaurants/:id/delete', function(req, res){
        var restoId = req.params.id;

        /*
        User.update({_id: currUser.id}, 
                    {$pull: {restaurants: {_id: ObjectId(restoId)}}},
                    function(err){
                        res.writeHead(302, {'Location': '/restaurants'});
                        res.end();
                    });*/

        
        Category.remove({restaurant_id: restoId}, function(err){
            Restaurant.remove({ '_id': restoId }, function(err){
                res.writeHead(302, {'Location': '/restaurants'});
                res.end();
            });
        });
    });


    app.post('/restaurants/new', function(req, res){
        var body = req.body;

        var resto = new Restaurant({name: body.name, 
                                    address: body.address,
                                    delivery_num: body.deliverynum,
                                    contact_num: body.contactnum,
                                    email: body.email,
                                    owner_id: currUser._id});

        /*
        User.update({_id: currUser.id}, {$push: {'restaurants': resto}}, {multi: true}, function(err, result){
            console.log(result);
            console.log(resto._id);
            res.writeHead(302, {'Location': '/restaurants/' + resto._id});
            res.end();
        });*/

        
        resto.save(function(err, resto){
            res.writeHead(302, {'Location': '/restaurants/' + resto._id});
            res.end();
        });
    });
 

    app.post('/restaurants/:id/edit', function(req, res){
        var restoId = req.params.id,
            body = req.body;

        var conditions = { _id: restoId }, 
            update = {$set: {name: body.name, 
                            address: body.address,
                            delivery_num: body.deliverynum,
                            contact_num: body.contactnum,
                            email: body.email}}, 
            options = { multi: true };
        /*
        var values = {'restaurants.$.name': body.name,
                        'restaurants.$.address': body.address,
                        'restaurants.$.delivery_num': body.deliverynum,
                        'restaurants.$.contact_num': body.contactnum,
                        'restaurants.$.email': body.email}

        User.update({_id: currUser.id, 
                    restaurants: {$elemMatch: {_id: ObjectId(restoId)}}}, 
                    {$set: values}, function(err, result){
                        console.log("UPDATE RESTAURANT");
                        console.log(result);

                        res.writeHead(302, {'Location': '/restaurants/' + restoId});
                        res.end();
                    });*/
        
        Restaurant.update(conditions, update, options, function(err, resto){
            res.writeHead(302, {'Location': '/restaurants/' + restoId});
            res.end();
        });
    });

};
