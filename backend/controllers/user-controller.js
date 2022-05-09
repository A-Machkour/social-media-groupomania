const database = require("../config/database");

exports.getUserInfo = (req, res) => {
  const id = req.params.id;
  database.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    // delete result[0].password;
    res.status(200).send(result);
  });
};

exports.updateOneUser = (req, res) => {
  const { firstname, lastname, bio } = req.body;
  const { id: userId } = req.params;
  database.query(
    "UPDATE users SET firstname = ?, lastname = ?, bio = ? WHERE users.id = ?",
    [firstname, lastname, bio, userId],
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      }
      if (result) {
        res.status(200).send(result);
      }
    }
  );
};

exports.deleteOneUser = (req, res) => {
  const { id: userId } = req.params;
  database.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    if (result) {
      res.status(200).send(result);
    }
  });
};

// exports.followUser = (req, res) => {
//   const { id: userId } = req.params;
//   const followerId = req.body.followerId;
//   database.query(
//     "UPDATE users SET followers = ? WHERE users.id = ?",
//     [followerId, userId],
//     (err, result) => {
//       if (err) {
//         res.status(404).send(err);
//       }
//       if (result) {
//         res.status(200).json({ message: "User followed successfully" });
//       }
//     }
//   );
// };

exports.getProfilPicture = (req, res, next) => {
  const { id } = req.params;
  const sqlGetPicture = `SELECT image_url FROM images WHERE images.user_id = ${id}`;
  database.query(sqlGetPicture, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
