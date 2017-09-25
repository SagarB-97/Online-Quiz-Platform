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
    var clas = req.body.class;
    var branch = req.body.branch;
    var phone = req.body.phone;
    var login_id = req.body.login_id;
    var password = req.body.password;

    var INSERT_QUERY_STUDENT = "INSERT INTO Student values\
                        (NULL,"+
                        q(name)+","+q(sex)+","+q(clas)+","+q(branch)+","+q(login_id)+","+q(phone)+");";
    var INSERT_QUERY_CREDENTIALS = "INSERT INTO Credentials values ("+
                        q(login_id)+","+q(password)+",2);";

    inserter(INSERT_QUERY_STUDENT);
    inserter(INSERT_QUERY_CREDENTIALS);

    res.render('login');
});

module.exports = router;
