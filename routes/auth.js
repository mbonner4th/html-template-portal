const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  password: String
});
const userModel = mongoose.model('user', userSchema);



/* GET users listing. */
router.get('/', function(req, res){
    res.render('longin-page');
});

router.post("/register", function(req, res){
    userModel.findOne({email : req.body.email},(err, docs)=>{
        if(err) console.log(err);
        if(docs == null){
            let newUser = new userModel({
                email : req.body.email,
                password : req.body.password
            });
            console.log('new user');
            newUser.save(function(err, user){
                if(err) return console.error(err);
                console.log(user);
                res.redirect('/admin-pannel');
            });
        } else{
            console.log(docs);
            res.redirect('/auth');
        }
    });
});

//TODO - Don't worry, Captain, we'll buff out these security holes later
router.post("/login", (req, res)=>{
    userModel.findOne(
        {email: req.body.email, password: req.body.password},
         (err, user)=>{
             if(err) console.log(err);
             if(user != null){
                 console.log('loged in');
                 res.redirect('/admin-pannel');
             } else {
                 res.redirect('/auth');
             }
         });
});

module.exports = router;
