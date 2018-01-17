var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  password: String
})

var userModel = mongoose.model('user', userSchema);



/* GET users listing. */
router.get('/', function(req, res){
    res.render('longin-page');
});

router.post("/register", function(req, res){
    var newUser = new userModel({
        email: req.body.email,
        password: req.body.password
    });
    
    newUser.save(function(err, user){
        if(err) return console.error(err);
        console.log(user);
    });
    res.redirect('/admin-pannel');
});

module.exports = router;
