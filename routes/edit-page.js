const express = require('express');
const router = express.Router();

const pageModel = require("../models/page");

function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/auth');
    } else {
      next();
    }
  };

router.get('/', (req, res)=>{
    res.render('edit-page');
});

router.post('/', requireLogin, (req, res)=>{
    console.log(req.body);

    let newPage = new pageModel({
        title: req.body.title,
        body : req.body.body,
        url: req.body.url,
        visable: req.body.visable,
        author: req.user.email
    });

    newPage.save((err, page)=>{
        if (err) console.log(err);
        res.redirect("/" + page.url);
    });

});

module.exports = router;