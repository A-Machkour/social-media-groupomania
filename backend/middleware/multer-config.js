const multer = require("multer");
const path = require("path");

const profilPath =
  __dirname + "../../../frontend/public/images/uploads/profils/";
const postPath = __dirname + "../../../frontend/public/images/uploads/posts/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_image") cb(null, postPath);
    else if (file.fieldname === "profil_picture") cb(null, profilPath);
  },
  filename: (req, file, callback) => {
    callback(
      null,
      "-" +
        Math.random().toString().slice(2, 6) +
        "-" +
        Math.random().toString().slice(2, 6) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
