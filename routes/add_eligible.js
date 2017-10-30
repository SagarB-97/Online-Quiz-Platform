var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}

router.get('/',function(req,res,next){
    var login_id = req.cookies.login;
    var quizid = req.cookies.quizid;

    var SELECT_QUERY_STUDENT = "SELECT * from Student" + ";";
        selecter(SELECT_QUERY_STUDENT,res,function(result,res){
            console.log(result);
            res.render('test_setter/Creation/add_eligible',{student : result});
        });
});


router.post('/',function(req,res,next){
    console.log(req.body);
    var quizid = req.cookies.quizid;

    input = req.body;
    var i = 0;

    while(1)
    {
        if(typeof input[String(i)] != "undefined")
        {
            var student = input[String(i)];

            var INSERT_QUERY = "INSERT INTO TestsEligibleFor values(" + q(student) + "," + q(quizid) + ",0);" ;

            console.log(INSERT_QUERY);

            inserter(INSERT_QUERY);

            i = i + 1;
        }

        else
            {
                break;
                res.clearCookie('quizid');
            }

    }

    res.render('creation_success');

});



module.exports = router;
