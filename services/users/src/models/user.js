var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    admin: Boolean
}));
