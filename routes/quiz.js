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
        inserter(INSERT_QUERY_RESPONSES,function(){
            var UPDATE_QUERY_ATTEMPTED = "UPDATE TestsEligibleFor SET test_taken = 1 WHERE "+
                "testid = " + quizid + " AND student_id = " + q(student_id) + ";";
            inserter(UPDATE_QUERY_ATTEMPTED);
        });
    });
    res.render('student/Quiz/submit_answer');
});

router.get('/view/:quizid', function(req,res){

    var quizid = req.params.quizid;

    var correct_ans = [];
    var orig_marks = [];
    var questionList = [];
    var tot_marks;

    var SELECT_QUERY_ANSWERS = "SELECT * FROM Quiz WHERE quizid = " + quizid +
             " ORDER BY qno;";
    selecter(SELECT_QUERY_ANSWERS,res,function(result,response){
        for(var i = 0;i<result.length;i++){
            var questionObj = {};

            var questionOptions = result[i].question.split("$");
            var marks = result[i].marks;

            questionObj.question = questionOptions[0];
            questionObj.options = questionOptions.slice(1);
            questionObj.marks = marks;


            questionList.push(questionObj);

            correct_ans.push(result[i].answer);
            orig_marks.push(result[i].marks);
        }

        var SELECT_QUERY_MARKS = "SELECT * FROM ListOfQuizzes WHERE quizid = " +q(quizid) + ";";

        selecter(SELECT_QUERY_MARKS,res,function(result,response){
            totMarks = result[0].total_marks;
        
            var objToSend = {correct_ans:correct_ans,
                            orig_marks:orig_marks,
                            totMarks:totMarks,
                            questionList:questionList};
            response.render('test_setter/Quiz/view_quiz',objToSend);
        });
        
    });


});

router.get('/result/:quizid',function(req,res){
    var quizid = req.params.quizid;
    var student_id = req.cookies.login;

    var correct_ans = [];
    var student_ans = [];
    var marks_alloted = [];
    var orig_marks = [];
    var questionList = [];
    var totMarks;

    var SELECT_QUERY_ANSWERS = "SELECT * FROM Quiz WHERE quizid = " + quizid+
             " ORDER BY qno;";
    selecter(SELECT_QUERY_ANSWERS,res,function(result,response){
        for(var i = 0;i<result.length;i++){
            var questionObj = {};

            var questionOptions = result[i].question.split("$");
            var marks = result[i].marks;

            questionObj.question = questionOptions[0];
            questionObj.options = questionOptions.slice(1);
            questionObj.marks = marks;


            questionList.push(questionObj);

            correct_ans.push(result[i].answer);
            orig_marks.push(result[i].marks);
        }
        var SELECT_QUERY_RESPONSES = "SELECT * FROM Responses WHERE student_id = "+
            q(student_id) + "AND quizid = "+quizid+";";
        selecter(SELECT_QUERY_RESPONSES,res,function(result,response){
            student_ans = result[0].answers.split('$');
            totMarks = result[0].marks_alloted;
            for(var i = 0;i<correct_ans.length;i++){
                if(student_ans[i]==correct_ans[i]){
                    marks_alloted.push(orig_marks[i]);
                }
                else{
                    marks_alloted.push(0);
                }
            }
            var objToSend = {correct_ans:correct_ans,
                            marks_alloted:marks_alloted,
                            student_ans:student_ans,
                            tot_marks:totMarks,
                            questionList:questionList};
            response.render('student/Quiz/result',objToSend);
        });
    });
});

module.exports = router;
