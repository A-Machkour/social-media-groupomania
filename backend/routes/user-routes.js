const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user-controller");
const uploadCtrl = require("../controllers/upload-controller");
const { auth } = require("../middleware/auth-middleware");
const upload = require("../middleware/multer-config");

router.get("/:id", auth, userCtrl.getUserInfo);
router.put("/:id", auth, userCtrl.updateOneUser);
router.delete("/:id", auth, userCtrl.deleteOneUser);
// router.patch("/follow/:id", auth, userCtrl.followUser);

//upload image
router.post(
  "/:id/upload",
  auth,

  upload.single("profil_picture"),
  uploadCtrl.uploadProfile
);
router.get("/:id/upload", auth, uploadCtrl.getProfilPicture);
module.exports = router;
