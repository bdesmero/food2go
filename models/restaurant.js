var mongoose = require('mongoose');

var Category = require('../models/category');

var restoSchema = mongoose.Schema({
                    name: String,
                    address: String,
                    district_id: Number,
                    delivery_num: String,
                    contact_num: String,
                    email: String,
                    owner_id: String
                });


var Restaurant = mongoose.model('Restaurant', restoSchema);

module.exports = Restaurant;