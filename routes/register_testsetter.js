var express = require('express');
var router = express.Router();
var inserter = require('../database_handlers/insertQuery.js');

function q(str){
    return "'"+str+"'";
}
router.post('/',function(req,res,next){
    res.send('Under development');
});

module.exports = router;
