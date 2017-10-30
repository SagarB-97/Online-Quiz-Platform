var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');
var selecter = require('../database_handlers/selectQuery.js');

function q(str){
    return "'"+str+"'";
}

router.get('/',function(req,res,next){

    res.render('test_setter/Creation/create_question');
});

router.post('/',function(req,res,next){
    console.log(req.body);
    var qno = Number(req.cookies.qno);
    console.log('Current Question: ' + qno);
    var quizid = Number(req.cookies.quizid);
    //res.cookie('qno', qno+1);

    var question = req.body.question;
    var o1 = req.body.o1;
    var o2 = req.body.o2;
    var o3 = req.body.o3;
    var o4 = req.body.o4;
    var answer = req.body.answer;
    var marks = req.body.marks;

    var qstring = question + "$" + o1 + "$" + o2 + "$" + o3 + "$" + o4;

    console.log(qstring);

    var INSERT_QUERY_QUIZ = "INSERT INTO Quiz values(" + quizid + "," + qno + "," + q(qstring) + ","+ q(answer) + "," + 1 +"," + marks + ");";

    inserter(INSERT_QUERY_QUIZ);

    if(Number(qno) >= Number(req.cookies.max_qno))
    {
        res.clearCookie('qno');
        res.clearCookie('max_qno');
        res.redirect('/add_eligible');
    }

    else
    {
        res.cookie('qno', Number(qno) + 1);
        res.redirect('/create_question');
    }
    
});

module.exports = router;