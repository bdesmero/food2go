var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
                    restaurant_id: String,
                    name: String,
                    address: String,
                    contact_num: String,
                    order_items: []
                });

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;