const database = require('../config/database');
// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : '21593612mega.'
// });

// pool.getConnection(function(err, database) {
//   database.query( 'SELECT * FROM users', function(err, rows) {

//       console.log(pool._freeConnections.indexOf(database)); // -1

//       database.release();

//       console.log(pool._freeConnections.indexOf(database)); // 0

//    });
// });

exports.signUp=(req, res)=> {

  const{ username, password, email } = req.body;
  database.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
  [username, password, email],
  (err, result)=> {
  if (err) {
    res.status(500).send(err);
  } else {
    res.status(201).send(result);
  }
  });
}   // end of signUp()

