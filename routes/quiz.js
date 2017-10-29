var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


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
    var student_responses = req.body;
    res.render('student/Quiz/submit_answer');
});

module.exports = router;
