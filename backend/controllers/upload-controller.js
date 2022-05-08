const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const database = require("../config/database");

module.exports.uploadProfile = async (req, res) => {
  // try {
  //   if (
  //     req.file.detectedMimeType != "image/jpg" &&
  //     req.file.detectedMimeType != "image/png" &&
  //     req.file.detectedMimeType != "image/jpeg"
  //   )
  //     throw Error("invalid file");

  //   if (req.file.size > 500000) throw Error("max size");
  // } catch (err) {
  //   return res.status(201).json(err);
  // }
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

  // try {
  //   console.log(fileName);
  //   await database.query(
  //     "UPDATE users SET profil_picture = ? WHERE id = ?",
  //     [req.file.filename, req.params.id],
  //     (err, result) => {
  //       if (err) {
  //         res.status(404).send(err);
  //       }
  //       if (result) {
  //         res.status(200).json({ message: "User updated successfully" });
  //       }
  //     }
  //   );
  // } catch (err) {
  //   return res.status(201).json(err);
  // }
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
