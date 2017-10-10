module.exports = function (SELECT_QUERY,callback,res){
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "onlinequizplatform"
    });
    var resultRecords;
    function selectCallBack(err){
    	if (err) throw err;
    	console.log("selectQuery.js connected");
    	// Run Select Query
    	con.query(SELECT_QUERY, function (err, result,fields) {
            resultRecords = result;
    		if (err) {
    			console.log(SELECT_QUERY + " : Not executed");
    			throw err;
    		}
            console.log(SELECT_QUERY + " : successfully executed!");	
    		con.end();
    		callback(resultRecords,res);
    	});

    };

    con.connect(selectCallBack);
}
