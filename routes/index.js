var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portal' });
});

router.get('/test', function(req, res){
  var newUser = new userModel({
    email: 'test@email',
    password: "testpass",
    test: 'new fields'
  });

  newUser.save(function(err, user){
    if(err) return console.error(err);
    console.log(user);
  });

  // sends empty response
  res.end();
});
module.exports = router;
