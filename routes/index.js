var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const pageModel = require("../models/page");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portal' });
});


module.exports = router;
