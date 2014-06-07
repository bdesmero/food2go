var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
                    category_id: String,
                    name: String,
                    description: String,
                    price: Number
                });


var Item = mongoose.model('Item', itemSchema);

module.exports = Item;