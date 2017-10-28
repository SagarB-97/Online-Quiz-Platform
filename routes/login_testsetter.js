var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}

function selecter_callback(result, res)
{
    console.log("Result = ")
    console.log(result);
    if(result.length == 0)
    	res.render('login_error');
    else{
    	res.cookie('login',result[0].login_id);
    	res.cookie('privilege',1);
        res.redirect('/dashboard_testsetter/user_profile');
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {

     if(typeof req.cookies=="undefined")
         res.render('test_setter/login');

     	else if(!req.cookies.hasOwnProperty('login'))
         	res.render('test_setter/login');
     
     	else res.redirect('/dashboard_testsetter');
});

router.post('/',function(req,res,next){
    var SELECT_QUERY = "SELECT * From TestSetter where login_id IN (SELECT login_id from Credentials where login_id = "
    					  + q(req.body.login_id) +"and password ="+ q(req.body.password)+");";
    console.log(req.body.login_id + " " + req.body.password);
	selecter(SELECT_QUERY,res,selecter_callback);
});

module.exports = router;
