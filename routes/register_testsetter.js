var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}
router.post('/',function(req,res,next){
    console.log(req.body);
    var name = req.body.name;
    var sex = req.body.sex;
    var phone = req.body.phone;
    var login_id = req.body.login_id;
    var password = req.body.password;

    var INSERT_QUERY_CREDENTIALS = "INSERT INTO Credentials values ("+
                        q(login_id)+","+q(password)+",1);";

    var INSERT_QUERY_TESTSETTER = "INSERT INTO TestSetter values\
                        ("+
                        q(name)+","+q(sex)+","+q(phone)+","+q(login_id)+");";

    inserter(INSERT_QUERY_CREDENTIALS,function(){inserter(INSERT_QUERY_TESTSETTER)});


    res.render('test_setter/login');
});

module.exports = router;
