var mongoose = require('mongoose');
var ObjectId = require('mongojs').ObjectId;

var User = require('../models/user');
var Category = require('../models/category');
var Item = require('../models/item');
var Order = require('../models/order');

module.exports.controller = function(app) {

    app.post('/orders/new', function(req, res){
        console.log("NEW ORDER");
        console.log(req.body);
    });

}