var express = require('express');
var router = express.Router();
var selecter = require('../database_handlers/selectQuery.js');


function q(str){
    return "'"+str+"'";
}
router.get('/',function(req,res,next){
    res.send('Under development');
});

module.exports = router;
