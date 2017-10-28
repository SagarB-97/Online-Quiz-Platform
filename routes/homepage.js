var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

    if(typeof req.cookies != "undefined" && req.cookies.hasOwnProperty('login'))
    {
        if(req.cookies.privilege == 2)
            {
                console.log("Student auto login");
                res.redirect('/dashboard_student');
            }
        else {
            console.log("Testsetter autologin");
            res.redirect('/dashboard_testsetter');
        }
    }
    res.render('homepage');
});

module.exports = router;
