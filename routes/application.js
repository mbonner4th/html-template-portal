var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    if(req.session && req.session.user.application.length){
        res.render('application');
    } else{
        res.render('add-application');    
    }

    
})

module.exports = router;