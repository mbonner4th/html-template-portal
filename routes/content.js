var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const pageModel = require("../models/page");


router.get('/', function(req, res){
    res.redirect('/auth');
});

// update to make url unique
router.get('/:page', function(req, res){
    console.log(req.params.page);
  
    pageModel.findOne({url : req.params.page}, (err, page) =>{
      if (err){
        console.log(err);
        res.redirect('/auth');
      } else if (page){
          // ask thi about lowdash
          
          
        if (page.visible){
            res.render('content', { 
                title: page.title,
                body: page.body, 
                date: page.date, 
                author: page.User.email,
                visible: page.visible,
            });   
        } else {
            // Need cleaner way of doing this
            if(req.user && (JSON.stringify(page.User._id) == JSON.stringify(req.user._id )) ){
                res.render('content', { 
                    title: page.title,
                    body: page.body, 
                    date: page.date, 
                    author: page.User.email,
                    visible: page.visible,
                });      
            } else {
                res.render('content', { 
                    title: "Page Hidden",
                    body: "This page is hidden by author", 
                    date: "", 
                    author: "",
                    visible: page.visible,
                });      
            }

        }
  
      } else{
        res.render('index', { title: "no page here" });
      }
  
    });
    
  });

module.exports = router;