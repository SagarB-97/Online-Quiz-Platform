var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
  inserter("INSERT INTO Credentials values ('student','student',2)");
});

module.exports = router;
