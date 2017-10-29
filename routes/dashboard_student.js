var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');

function q(str){
    return "'"+str+"'";
}
router.get('/',function(req,response,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";

    selecter(SELECT_QUERY,response,function(result,response){
        var info = result[0];
        var SELECT_QUERY_TESTS = "SELECT * from ListOfQuizzes inner join TestsEligibleFor \
        ON ListOfQuizzes.quizid = TestsEligibleFor.testid \
        WHERE TestsEligibleFor.student_id = " + q(login_id) + ";";
        selecter(SELECT_QUERY_TESTS,response,function(result,response){
            var active_tests = [];
            for(var i=0;i<result.length;i++){
                var start_time = new Date(result[i].start_time);
                var end_time = new Date(result[i].end_time);
                var cur_date = new Date();

                if(start_time<cur_date && end_time>cur_date){
                    active_tests.push(result[i]);
                }
            }

            response.render('student/Dashboard/dashboard',
                {info:info,active_tests:active_tests});
        });
    });
});

router.get('/user_profile',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('student/Dashboard/user_profile',result[0]);
    });
});

router.get('/tests_list',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY_INFO = "SELECT * FROM Student WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY_INFO,res,function(result,res){
        var info = result[0];
        var SELECT_QUERY_TESTS = "SELECT * from ListOfQuizzes inner join TestsEligibleFor \
        ON ListOfQuizzes.quizid = TestsEligibleFor.testid \
        WHERE TestsEligibleFor.student_id = " + q(login_id) + ";";
        selecter(SELECT_QUERY_TESTS,res,function(result,res){
            console.log(result);
            res.render('student/Dashboard/tests_list',{info : info,tests_list : result});
        });
    });
});
module.exports = router;
