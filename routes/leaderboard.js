var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}

router.get('/:quizid', function(req, res, next){

	var quizid = req.params.quizid;
	console.log("Currently viewing leaderboard of quiz: " + quizid);

	var SELECT_QUERY_RESPONSES = "SELECT * FROM Responses INNER JOIN Student ON Responses.student_id = Student.login_id \
	WHERE quizid = " + quizid + " ORDER BY marks_alloted DESC;";

	selecter(SELECT_QUERY_RESPONSES, res, function(result, res){

		var SELECT_QUERY_QUIZ = "SELECT * FROM ListOfQuizzes WHERE quizid = " +q(quizid) + ";";

		var student = result;

		selecter(SELECT_QUERY_QUIZ, res, function(result,res){
            
            res.render('leaderboard', {student:student, quiz:result[0]});
        });
	});
});

router.get('/:quizid/responses/:student_id', function(req, res, next){

	var quizid = req.params.quizid;
	var student_id = req.params.student_id;

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
            response.render('result',objToSend);
        });
    });


});


module.exports = router;