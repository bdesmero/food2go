var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
                    email: String,
                    password: String,
                    name: String,
                    type: String
                });


var User = mongoose.model('User', userSchema);

module.exports = User;