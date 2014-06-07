var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
                        restaurant_id: String,
                        name: String,
                        items: []
                    });


var Category = mongoose.model('Category', categorySchema);

module.exports = Category;