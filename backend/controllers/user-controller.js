const database = require('../config/database');

exports.getUserInfo = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        delete result[0].password;
        res.status(200).send(result);
    });
}

// exports.updateOneUser = (req, res) => {
//     if (req.file) {
//       const {id: user_id} = req.params
//       let {destination, filename} = req.file
//       destination = destination + filename
  
//       const sqlInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${user_id}, "${destination}");`;
//       db.query(sqlInsertImage, (err, result) => {
//         if (err) {
//           res.status(404).json({ err });
//           throw err;
//         }
//       });
//     }
  
//     const { user_firstname, user_lastname } = req.body;
//     const { id: userId } = req.params;
//     const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}" WHERE users.user_id = ${userId};`;
//     db.query(sqlUpdateUser, (err, result) => {
//       if (err) {
//         res.status(404).json({ err });
//         throw err;
//       }
//       if (result) {
//         res.status(200).json(result);
//       }
//     });
//   };

exports.updateOneUser = (req, res) => {
    const { firstname, lastname } = req.body;
    const { id: userId } = req.params;
    database.query('UPDATE users SET firstname = ?, lastname = ? WHERE users.id = ?',
    [firstname, lastname, userId],
    (err, result) => {
        if (err) {
            res.status(404).send(err);
        }
        if (result) {
            res.status(200).send(result);
        }
    });
}