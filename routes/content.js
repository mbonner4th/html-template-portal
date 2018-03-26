var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const pageModel = require("../models/page");


function findAllPages(){
    return pageModel.find({visible: true})
}

function findLastPage(){
    return pageModel.findOne({visible:true}, {}, {sort: {"date": -1}});
}

router.get('/', function(req, res){
    //res.redirect('/auth');
    findAllPages().then(function(pages){
        if(pages){
            res.render("homepage", {user: "test", pageList: pages});
        }

    }).catch(function(err){
        console.log(err);
    })
});

router.get('/new-page', function(req,res){
    res.render("new-page");
})

router.get('/latest', function(req, res){
    console.log("hit")
    findLastPage().then(function(page){
        
        res.render('content', { 
            title: page.title,
            body: page.body, 
            date: page.date, 
            author: page.User.email,
            visible: page.visible,
            quillBody: page.quillBody,
        });
    }).catch(function(err){});
});


// update to make url unique
router.get('/:page', function(req, res){
    pageModel.findOne({url : req.params.page}, (err, page) =>{
      if (err){
        console.log(err);
        res.redirect('/');
      } else if (page){
          // ask thi about lowdash        
        if (page.visible){
            res.render('content', { 
                title: page.title,
                body: page.body, 
                date: page.date, 
                author: page.User.email,
                visible: page.visible,
                quillBody: page.quillBody,
            });   
        } else {
            // Need cleaner way of doing this
            if(req.user && (page.User._id.toString() == req.user._id.toString()) ){
                res.render('content', { 
                    title: page.title,
                    body: page.body, 
                    date: page.date, 
                    author: page.User.email,
                    visible: page.visible,
                    quillBody: page.quillBody,
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
        res.redirect('/');
      }
  
    });
    
  });

  router.get("/json/:pageURL", function(req, res){
    pageModel.findOne({url: req.params.pageURL}, function(err, page){
        if(err){
            res.sendStatus(500);
        }
        else if (page){
            res.jsonp(JSON.parse(page.body));
        }
        else {
            res.sendStatus(404);
        }
    });
  });

module.exports = router;