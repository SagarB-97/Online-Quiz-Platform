var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}

var count = 0;

router.get('/',function(req,res,next){

    res.render('test_setter/Creation/create_details');
});



router.post('/create_details',function(req,res,next){
    console.log(req.body);
    var stime = req.body.start_time;
    var etime = req.body.end_time;
    var tmarks = req.body.total_marks;
    var login_id = req.cookies.login;
    var num_of_questions = req.body.num_of_questions;

    var INSERT_QUERY_LIST_OF_QUIZZES = "INSERT INTO ListOfQuizzes values(NULL, "
                        + q(stime) + ","+ q(etime) + "," + 5 + "," + tmarks + "," + num_of_questions + "," +q(login_id)+");";

    inserter(INSERT_QUERY_LIST_OF_QUIZZES);


    //res.render('test_setter/login');
    res.send('Quiz Added');
});

module.exports = router;