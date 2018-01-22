const express = require('express');
const router = express.Router();

const pageModel = require("../models/page");

router.get('/', (req, res)=>{
    res.render('edit-page');
});

router.post('/', (req, res)=>{
    console.log(req.body);

    let newPage = new pageModel({
        title: req.body.title,
        body : req.body.body,
        url: req.body.url,
        visable: req.body.visable
    });

    newPage.save((err, page)=>{
        if (err) console.log(err);
        res.redirect("/" + page.url);
    });

});

module.exports = router;