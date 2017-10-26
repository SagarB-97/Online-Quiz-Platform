var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

	console.log('Logged Out');

	res.clearCookie('login');
	res.redirect('/');
});

module.exports = router;