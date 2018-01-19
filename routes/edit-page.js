var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  title: String,
  body: String,
  visable: Boolean
});

const pageModel = mongoose.model('page', pageSchema);

router.get('/', (req, res)=>{
    res.render('edit-page');
});

router.post('/', (req, res)=>{
    console.log(req.body);

    let newPage = new pageModel({
        title: req.body.title,
        body : req.body.body,
        visable: req.body.visable
    });

    newPage.save((err, doc)=>{
        if (err) console.log(err);
        console.log(doc);
        res.redirect('/content');
    });

});

module.exports = router;