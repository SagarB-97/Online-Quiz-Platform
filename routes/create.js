var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');
var selecter = require('../database_handlers/selectQuery.js');

function q(str){
    return "'"+str+"'";
}

var count = 0;

router.get('/',function(req,res,next){

    res.render('test_setter/Creation/create_details');
});


function selecter_callback(result, res)
{
    console.log("Result: " + result[0].quizid);
    res.cookie('quizid', result[0].quizid);
    res.redirect('/create_question');
}


router.post('/',function(req,res,next){
    console.log(req.body);
    var stime = req.body.start_time;
    var etime = req.body.end_time;
    var tmarks = req.body.total_marks;
    var login_id = req.cookies.login;
    var num_of_questions = req.body.num_of_questions;

    res.cookie('qno',Number(1));
    res.cookie('max_qno',Number(num_of_questions));
    console.log("Max Qno: " + num_of_questions);

    var INSERT_QUERY_LIST_OF_QUIZZES = "INSERT INTO ListOfQuizzes values(NULL, "
                        + q(stime) + ","+ q(etime) + "," + tmarks + "," + num_of_questions + "," +q(login_id)+");";

    var SELECT_QUERY = "SELECT * FROM ListOfQuizzes WHERE testsetterid = " + q(login_id) + "AND num_of_questions = " + num_of_questions + " AND start_time = " + q(stime) +";";

    inserter(INSERT_QUERY_LIST_OF_QUIZZES);

    selecter(SELECT_QUERY, res, selecter_callback);
});

module.exports = router;