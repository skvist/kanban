var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({
    title: { type: String, required: true },
    description: String,
    type: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    duedate: { type: Date },
    deleted: { type: Boolean, default: false },
    position: Number,
    createdby: String,
    assigned: String,
    timelog: [{
        user: String,
        description: String,
        time: Number,
    }],
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
}));
