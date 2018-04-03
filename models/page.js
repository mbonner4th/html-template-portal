const mongoose = require('mongoose');


// TODO - update model to make url unique

const schema = mongoose.Schema({
    title: {
        type:String, 
        required: true
        },
    body: {
        type: String, 
        required: true
        },
    url: {
        type: String, 
        required: true, 
        unique: true 
    },
    description: {
        type: String, 
        default:"",
    },
    date: { type: Date, default: Date.now },
    visible: {type: Boolean, default: true},
    User: {type: Object}
});

const pageModel = mongoose.model('page', schema);

module.exports = pageModel;