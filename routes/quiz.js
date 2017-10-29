var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}
router.get('/:quizid', function(req, res, next){
    var quizid = req.params.quizid;

    var SELECT_QUERY_QUIZQUES = "SELECT * FROM Quiz WHERE quizid = "+quizid+";";
    selecter(SELECT_QUERY_QUIZQUES,res,function(result,response){
        var questionList = [];
        for(var i=0;i<result.length;i++){
            var questionObj = {};
            var questionOptions = result[i].question.split("$");
            var marks = result[i].marks;

            questionObj.question = questionOptions[0];
            questionObj.options = questionOptions.slice(1);
            questionObj.marks = marks;


            questionList.push(questionObj);
        }
        response.render('student/Quiz/quiz',{questionList:questionList,quizid:quizid});
    });
});

router.post('/submit_answer/:quizid',function(req,res,next){
    var quizid = req.params.quizid;
    var student_responses = req.body.responses;
    var student_id = req.cookies.login;

    // var INSERT_QUERY_RESPONSES = "INSERT INTO Responses values ("+
    //                     q(student_id)+","+
    //                     quizid+","+
    //                     q(student_responses)+",NULL);";
    // inserter(INSERT_QUERY_RESPONSES,function(){
    //     var SELECT_QUERY_ANSWERS = "SELECT answer,marks FROM Quiz WHERE quizid = "+quizid+
    //         " ORDER BY qno;";
    //     selecter(SELECT_QUERY_ANSWERS,res,function(result,response){
    //         var student_ans = [];
    //         var correct_ans = [];
    //         var marks = [];
    //         for(var i = 0;i<result.length;i++){
    //             correct_ans.push(result[i].answer);
    //             marks.push(result[i].marks);
    //         }
    //         student_ans = student_responses.split('$');
    //         var tot_marks = 0;
    //         for(var i = 0;i<student_ans.length;i++){
    //             if(student_ans[i]==correct_ans[i])
    //                 tot_marks+=marks[i];
    //         }
    //         console.log("tot_marks = "+tot_marks);
    //     });
    // });


    var SELECT_QUERY_ANSWERS = "SELECT answer,marks FROM Quiz WHERE quizid = "+quizid+
             " ORDER BY qno;";
    selecter(SELECT_QUERY_ANSWERS,res,function(result,response){
        var student_ans = [];
        var correct_ans = [];
        var marks = [];
        for(var i = 0;i<result.length;i++){
            correct_ans.push(result[i].answer);
            marks.push(result[i].marks);
        }
        student_ans = student_responses.split('$');
        var tot_marks = 0;
        for(var i = 0;i<student_ans.length;i++){
         if(student_ans[i]==correct_ans[i])
            tot_marks+=marks[i];
        }
        var INSERT_QUERY_RESPONSES = "INSERT INTO Responses values ("+
                            q(student_id)+","+
                            quizid+","+
                            q(student_responses)+"," + tot_marks + ");";
        inserter(INSERT_QUERY_RESPONSES);
    });
    res.render('student/Quiz/submit_answer');
});

module.exports = router;
