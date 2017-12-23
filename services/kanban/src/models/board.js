var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Board', new Schema({
    title: { type: String, required: true },
    description: String,
    owner: { type: String, required: true },
    users: [ String ],
    created: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
}));
