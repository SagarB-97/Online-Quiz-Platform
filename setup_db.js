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
var CREATE_CREDENTIALS_QUERY = "CREATE TABLE Credentials (login_id varchar(50) PRIMARY KEY,\
								password varchar(50),\
								privilege INT)";

var CREATE_LISTOFQUIZ_QUERY = "CREATE TABLE ListOfQuizzes (quizid INT PRIMARY KEY,\
								start_time datetime,\
								end_time datetime,\
								duration INT,\
								total_marks INT,\
								num_of_questions INT,\
								leaderboardid INT,\
								responsesid INT,\
								testsetterid INT)";

var CREATE_QUIZ_QUERY = "CREATE TABLE Quiz (qno INT PRIMARY KEY,\
						 question varchar(50),\
						 answer varchar(255),\
						 qtype varchar(20),\
						 marks INT)";

var CREATE_LEADERBOARD_QUERY = "CREATE TABLE Leaderboard (Rank INT PRIMARY KEY,\
								student varchar(100))";

var CREATE_RESPONSES_QUERY = "CREATE TABLE Responses (student_id INT,\
							  answers varchar(255),\
							  marks_alloted INT)";

function initStatements(err){
	if (err) throw err;
	console.log("Connected!");


	// Create DB
	con.query(CREATE_DB_QUERY, function (err, result) {
		//console.log(err);
		if(err)
		if(err.code === "ER_DB_CREATE_EXISTS")
		{
			console.log("Database Already Exists");	
		}
		if (err) throw err;
		console.log("Database Created");
	});


	// Use DB
	con.query(USE_DB_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Using DB");
	});

	// Create Student Table
	con.query(CREATE_STUDENT_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Student Table created");
	});

	// Create TestSetter Table
	con.query(CREATE_TESTSETTER_QUERY, function (err, result) {
		if (err) throw err;
		console.log("TestSetter Table created");
	});

	// Create Credentials Table
	con.query(CREATE_CREDENTIALS_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Credentials Table created");
	});

	// Create List of Quizzes Table
	con.query(CREATE_LISTOFQUIZ_QUERY, function (err, result) {
		if (err) throw err;
		console.log("ListOfQuizzes Table created");
	});

	// Create Quiz Table
	con.query(CREATE_QUIZ_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Quiz Table created");
	});

	//Create Leaderboard Table
	con.query(CREATE_LEADERBOARD_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Leaderboard Table created");
	});

	//Create Responses Table
	con.query(CREATE_RESPONSES_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Responses Table created");
	});

}

con.connect(initStatements);