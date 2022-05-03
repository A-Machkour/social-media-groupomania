const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_picutre") cb (null, "./images/posts/");
    else if (file.fieldname === "profil_picture") cb (null, "./images/profils/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

module.exports = upload;