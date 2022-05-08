const database = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
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

exports.signUp = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const { username, email } = req.body;
  database.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, hashedPassword, email],
    (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      }
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({ message: "Inscription réussie" });
      }
    }
  );
}; // end of signUp()

exports.login = (req, res) => {
  const { email, password } = req.body;
  database.query(
    "SELECT id, username, password FROM users WHERE email = ?",
    [email],
    (err, result) => {
      // if no user with this email
      if (!result[0]) {
        res.status(200).json({ message: "Email inconnu" });
      }
      if (err) {
        res.status(500).send(err);
      } else {
        // if password is correct
        if (bcrypt.compareSync(password, result[0].password)) {
          // create a token
          const token = jwt.sign(
            {
              id: result[0].id, // id de l'utilisateur
            },
            process.env.JWT_TOKEN,
            { expiresIn: "24h" }
          );
          delete result[0].password;

          res.cookie("jwt", token, { maxAge: 86400000 });
          // send the token
          res.status(200).json({
            message: "Connexion réussie",
            token: token,
            id: result[0].id,
          });
        }
        // if password is not correct
        else {
          res.status(200).json({ message: "Mot de passe incorrect" });
        }
      }
    }
  );
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Déconnexion réussie" });
};
