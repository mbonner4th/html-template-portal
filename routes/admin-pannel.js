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

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  let myPages={}
  pageModel.find({author: req.user.email}, (err, pages)=>{
    if (err){
      console.log(err);
      res.redirect("/auth");
    }
    if(pages){
      myPages = pages;
      res.render('admin-pannel', {user: req.user.email, pageList: pages });
    } else{
      console.log("no pages found");
      res.render('admin-pannel', {user: req.user.email, pageList: [] });
    }
  });

  
});

module.exports = router;