var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}
router.get('/',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('Dashboard/dashboard',result[0]);
    });
});

router.get('/user_profile',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('Dashboard/user_profile',result[0]);
    });
});

router.get('/tests_list',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('Dashboard/tests_list',result[0]);
    });
});
module.exports = router;
