var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

var CREATE_DB_QUERY = "CREATE DATABASE onlinequizplatform;";
var USE_DB_QUERY = "USE onlinequizplatform;";

var CREATE_CREDENTIALS_QUERY = "CREATE TABLE Credentials (login_id varchar(50) PRIMARY KEY,\
								password varchar(50),\
								privilege INT)";

var CREATE_STUDENT_QUERY = "CREATE TABLE Student (name VARCHAR(100),\
							sex CHAR(1),\
							class varchar(20),\
							branch varchar(30),\
							login_id varchar(50) PRIMARY KEY,\
							phone varchar(20),\
							FOREIGN KEY(login_id) REFERENCES Credentials(login_id) ON DELETE CASCADE)";

var CREATE_TESTSETTER_QUERY = "CREATE TABLE TestSetter (name varchar(100),\
							sex char(1),\
							phone varchar(20),\
							login_id VARCHAR(50) PRIMARY KEY,\
							FOREIGN KEY(login_id) REFERENCES Credentials(login_id) ON DELETE CASCADE)"; 





var CREATE_LISTOFQUIZ_QUERY = "CREATE TABLE ListOfQuizzes (quizid INT PRIMARY KEY AUTO_INCREMENT,\
								start_time datetime,\
								end_time datetime,\
								total_marks INT,\
								num_of_questions INT,\
								testsetterid varchar(50),\
								FOREIGN KEY(testsetterid) REFERENCES Credentials(login_id))";

var CREATE_TESTS_ELIGIBLE = "CREATE TABLE TestsEligibleFor(student_id varchar(50),\
							 testid INT,\
							 test_taken INT,\
							 PRIMARY KEY(student_id, testid),\
							 FOREIGN KEY(student_id) REFERENCES Student(login_id) ON DELETE CASCADE,\
							 FOREIGN KEY(testid) REFERENCES ListOfQuizzes(quizid) ON DELETE CASCADE)";								

var CREATE_QUIZ_QUERY = "CREATE TABLE Quiz (quizid INT,\
						 qno INT,\
						 question TEXT,\
						 answer TEXT,\
						 qtype varchar(20),\
						 marks INT,\
						 PRIMARY KEY(quizid,qno),\
						 FOREIGN KEY(quizid) REFERENCES ListOfQuizzes(quizid) ON DELETE CASCADE)";

var CREATE_LEADERBOARD_QUERY = "CREATE TABLE Leaderboard (Rank INT,\
								student_id varchar(50),\
								testid INT,\
								PRIMARY KEY(student_id,testid),\
								FOREIGN KEY(student_id) REFERENCES Student(login_id) ON DELETE CASCADE,\
								FOREIGN KEY(testid) REFERENCES ListOfQuizzes(quizid) ON DELETE CASCADE\
								)";

var CREATE_RESPONSES_QUERY = "CREATE TABLE Responses (student_id varchar(50),\
							  quizid INT,\
							  answers text,\
							  marks_alloted INT,\
							  PRIMARY KEY(student_id,quizid),\
							  FOREIGN KEY(student_id) REFERENCES Student(login_id) ON DELETE CASCADE,\
							  FOREIGN KEY(quizid) REFERENCES ListOfQuizzes(quizid) ON DELETE CASCADE\
							  )";

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

		// Create Credentials Table
	con.query(CREATE_CREDENTIALS_QUERY, function (err, result) {
		if (err) throw err;
		console.log("Credentials Table created");
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

	// Create List of Quizzes Table
	con.query(CREATE_LISTOFQUIZ_QUERY, function (err, result) {
		if (err) throw err;
		console.log("ListOfQuizzes Table created");
	});

	// Create Tests Eligible Table
	con.query(CREATE_TESTS_ELIGIBLE, function (err, result) {
		if (err) throw err;
		console.log("Tests Eligible Tablecreated");
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
	con.end();
}

con.connect(initStatements);