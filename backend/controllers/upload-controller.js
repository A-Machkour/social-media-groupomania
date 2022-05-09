const database = require("../config/database");

module.exports.uploadProfile = async (req, res) => {
  const fileName = req.file.filename;
  const filePath = `./images/uploads/profils/${fileName}`;

  database.query(
    `UPDATE users SET images = "${filePath}" WHERE users.id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        res.status(404).json(err);
      }
      if (result) {
        res.status(200).json({
          message: "image uploaded",
        });
      }
    }
  );
};

module.exports.getProfilPicture = async (req, res) => {
  const sql = "SELECT images FROM users WHERE id = ?";
  database.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send({ msg: "error" });
    }
    if (result) {
      res.send({ image: result[0].images });
    }
  });
};
