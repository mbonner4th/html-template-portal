var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const pageModel = require("../models/page");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portal' });
});

router.get('/:page', function(req, res){
  console.log(req.params.page);

  pageModel.findOne({url : req.params.page}, (err, page) =>{
    if (err){
      console.log(err);
      res.redirect('/auth');
    } else if (page){
      res.render('content', { 
        title: page.title,
        body: page.body, 
        date: page.date, 
        author: page.author
      });

    } else{
      res.render('index', { title: "no page here" });
    }

  });
  
});
module.exports = router;
