module.exports = function (INSERT_QUERY,callback){
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "onlinequizplatform"
    });

    function insertCallBack(err){
    	if (err) throw err;
    	console.log("insertQuery.js connected");
    	// Run insert Query
    	con.query(INSERT_QUERY, function (err, result) {
    		if (err) throw err;
    		console.log(INSERT_QUERY + " : successfully executed!");
    	});

    }

    con.connect(insertCallBack);
    if(callback) callback();
}
