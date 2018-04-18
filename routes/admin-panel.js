const express = require('express');
const router = express.Router();

const pageModel = require("../models/page");



/* GET home page. */
router.get('/', function(req, res, next) {
  pageModel.find({"User._id": req.user._id}, {}, {sort: {"date": -1}}, (err, pages)=>{
    if (err){
      console.log(err);
      res.redirect("/auth");
    }
    if(pages){
      res.render('admin-panel', {user: req.user.email, pageList: pages });
    } else{
      console.log("no pages found");
      res.render('admin-panel', {user: req.user.email, pageList: [] });
    }
  });

  
});

module.exports = router;