/*
var mongoose = require('mongoose');

var restoSchema = mongoose.Schema({
                    name: String,
                    address: String,
                    delivery_num: String,
                    contact_num: String,
                    email: String
                });


var Restaurant = mongoose.model('Restaurant', restoSchema);


exports.index = function(req, res){
    Restaurant.find(function(err, results){
        console.log(results);
        res.render('restaurant/index', {restos: results});
    });
};


exports.new = function(req, res){
    res.render('restaurant/new');
};


exports.create = function(req, res){
    var body = req.body;

    var resto = new Restaurant({name: body.name, 
                                address: body.address,
                                delivery_num: body.deliverynum,
                                contact_num: body.contactnum,
                                email: body.email});

    resto.save(function(err, resto){
        res.writeHead(302, {'Location': '/restaurants/' + resto._id});
        res.end();
    });
};


exports.show = function(req, res){
    var restoId = req.params.id;

    Restaurant.findOne({ '_id': restoId }, function (err, resto) {
        res.render('restaurant/show', resto);
    });
};


exports.edit = function(req, res){
    var restoId = req.params.id;

    Restaurant.findOne({ '_id': restoId }, function (err, resto) {
        res.render('restaurant/edit', resto);
    });
};


exports.update = function(req, res){
    var restoId = req.params.id,
        body = req.body;

    var conditions = { _id: restoId }, 
        update = {$set: {name: body.name, 
                        address: body.address,
                        delivery_num: body.deliverynum,
                        contact_num: body.contactnum,
                        email: body.email}}, 
        options = { multi: true };

        Restaurant.update(conditions, update, options, function(err, resto){
            res.writeHead(302, {'Location': '/restaurants/' + restoId});
            res.end();
        });
};


exports.delete = function(req, res){
    console.log("DELETE RESTAURANT");
};
*/