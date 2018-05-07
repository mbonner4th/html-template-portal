var express = require('express');
var router = express.Router();

var applicationModel = require('../models/application');
var userModel = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.session.user);
});

router.post('/',function(req,res,next){
  console.log("boop")
  res.end();
})

router.post('/application', function(req, res, next){
  var newApplication = new applicationModel({
    accountName: req.body.accountName,
    basicAuth: req.body.basicAuth, 
    url: req.body.url
  });
  newApplication.save((err, application)=>{
    if(err){
      console.log(err);
      res.status(500).send({"message":"application saving failed"});
    } else {
      console.log("saved successfully");
      userModel.findByIdAndUpdate({_id: req.session.user._id},{$addToSet:{application: application._id}})
      .then(function(user){
        console.log("user updated");
        console.log(user);
        res.status(200).send(application);
      }).catch(function(err){
        console.log(err);
        res.status(500).send({"message":"failed to link user and applciation"})
      });
    }
  });
});

router.get('/application', function(req, res, next){
  console.log("GET account hit");
  res.send(200);
});

module.exports = router;
