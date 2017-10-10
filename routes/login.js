var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}

function logger(result, res)
{
    console.log("Result = ")
    console.log(result);
    if(result.length == 0)
    	res.send("Wrong username or password");
    else
    	res.send(result);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',function(req,res,next){
    //var SELECT_QUERY = "SELECT * FROM Credentials WHERE login_id = " + q(req.body.login_id) + ";";
    var SELECT_QUERY = "SELECT * From Student where login_id IN (SELECT login_id from Credentials where login_id =\
    					 " + q(req.body.login_id) +"and password ="+ q(req.body.password)+");";
    console.log(req.body.login_id + " " + req.body.password);
	selecter(SELECT_QUERY,logger,res);
	//res.render('login');

});

module.exports = router;
