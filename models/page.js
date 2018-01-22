const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type:String, 
        required: true
        },
    body: {
        type: String, 
        required: true
        },
    url: String,
    author: {type: String, default: 'guitarist' },
    date: { type: Date, default: Date.now },
    visable: Boolean
});

const pageModel = mongoose.model('page', schema);

module.exports = pageModel;