const express = require('express');
const router = express.Router();

const userModel = require("../models/user")
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
                req.user = user.toObject();
                delete req.user.password;
                req.session.user = user;
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
                 req.user = user.toObject();
                 delete req.user.password;
                 req.session.user = user;
                 res.redirect('/admin-pannel');
             } else {
                res.render('longin-page', {
                    authError : "wrong password or email"
                });
             }
         });
});

router.get('/logout', function(req, res) {
    req.session.reset();
    console.log("no more session");
    res.redirect('/auth');
  });

module.exports = router;
