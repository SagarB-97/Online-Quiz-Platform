var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}
router.get('/',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM TestSetter WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('test_setter/Dashboard/dashboard',result[0]);
    });
});

router.get('/user_profile',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY = "SELECT * FROM TestSetter WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY,res,function(result,res){
        res.render('test_setter/Dashboard/user_profile',result[0]);
    });
});


router.get('/tests_list',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY_INFO = "SELECT * FROM TestSetter WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY_INFO,res,function(result,res){
        var info = result[0];
        var SELECT_QUERY_TESTS = "SELECT * from ListOfQuizzes WHERE testsetterid = " + q(login_id) + ";";
        selecter(SELECT_QUERY_TESTS,res,function(result,res){
            console.log(result);
            res.render('test_setter/Dashboard/tests_list',{info : info,tests_list : result});
        });
    });
});

router.get('/test_stats',function(req,res,next){
    var login_id = req.cookies.login;
    var SELECT_QUERY_INFO = "SELECT * FROM TestSetter WHERE login_id = " + q(login_id) + ";";
    selecter(SELECT_QUERY_INFO,res,function(result,res){
        var info = result[0];
        var SELECT_QUERY_TESTS = "SELECT * from ListOfQuizzes WHERE testsetterid = " + q(login_id) + ";";
        selecter(SELECT_QUERY_TESTS,res,function(result,res){
            console.log(result);
            res.render('test_setter/Dashboard/test_stats',{info : info,tests_list : result});
        });
    });
});

router.get('/test_stats/:quizid',function(req,res,next){
    var quizid = req.params.quizid;

    var stats=[];
    var marks = [];
    var SELECT_QUERY_RESPONSES = "SELECT marks_alloted from Responses WHERE quizid = "+q(quizid)+";";

    selecter(SELECT_QUERY_RESPONSES,res,function(result,res){
        for(var i =0;i<result.length;i++)
            marks.push(result[i].marks_alloted);
        marks.sort();
        stats.nos = marks.length;
        stats.max = Math.max.apply(Math, marks);
        stats.min = Math.min.apply(Math, marks);

        var sum = 0;
        for(var i=0;i<marks.length;i++){
            sum=sum+marks[i];
        }
        if(stats.nos==0){
            stats.max='---';
            stats.min='---';
            stats.avg='---';
            stats.median='---';
        }
        else{
            stats.avg = sum/stats.nos;
            if (stats.nos % 2 === 0) {
                stats.median = (marks[marks.length / 2 - 1] + marks[marks.length / 2]) / 2;
            }
            else {
                stats.median = marks[(marks.length - 1) / 2];
            }
            stats.avg = stats.avg.toFixed(2);
            stats.median = stats.median.toFixed(2);
        }

        res.render('test_setter/Dashboard/stats_table',{stats:stats});
    });
});
module.exports = router;
