module.exports = function (SELECT_QUERY){
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
    		if (err) throw err;
    		console.log(SELECT_QUERY + " : successfully executed!");
    	});

    }

    con.connect(selectCallBack);
    return resultRecords;
}
