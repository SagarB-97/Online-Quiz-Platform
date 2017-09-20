var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

var CREATE_DB_QUERY = "CREATE DATABASE onlinequizplatform;";
var USE_DB_QUERY = "USE onlinequizplatform;";
var CREATE_STUDENT_QUERY = "CREATE TABLE Student (student_id INT PRIMARY KEY AUTO_INCREMENT,\
							name VARCHAR(100),\
							sex CHAR(1),\
							class varchar(20),\
							branch varchar(30),\
							login_id varchar(50) UNIQUE,\
							phone varchar(20))";
var CREATE_TESTSETTER_QUERY = "CREATE TABLE TestSetter (setter_id INT PRIMARY KEY AUTO_INCREMENT,\
							login_id VARCHAR(50) UNIQUE)"; 


function initStatements(err){
	if (err) throw err;
	console.log("Connected!");

	// Create DB
	con.query(CREATE_DB_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Database Created");
	});

	// Use DB
	con.query(USE_DB_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Using DB");
	});

	// Use DB
	con.query(CREATE_STUDENT_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Student Table created");
	});

}

con.connect(initStatements);