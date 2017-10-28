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
        res.redirect('/dashboard/user_profile');
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Under development');
});

module.exports = router;
