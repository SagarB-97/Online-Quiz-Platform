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


module.exports = router;