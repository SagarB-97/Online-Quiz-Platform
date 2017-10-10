var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}

function logger(result)
{
    console.log("Result = ")
    console.log(result);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',function(req,res,next){
    var SELECT_QUERY = "SELECT * FROM Credentials WHERE login_id = " + q(req.body.login_id) + ";";
    console.log(req.body.login_id + " " + req.body.password);
	selecter(SELECT_QUERY,logger);
	res.render('login');

});

module.exports = router;
