var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('edit-page');
})

module.exports = router;