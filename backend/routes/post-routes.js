const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post-controller");
const { auth } = require("../middleware/auth-middleware");
const upload = require("../middleware/multer-config");

// POST ROUTES CRUD
router.get("/", postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/:id", upload.single("post_image"), postCtrl.createPost);

router.delete("/:id", postCtrl.deleteOnePost);

// IMAGES
router.get("/image/:id", postCtrl.getOneImage);

// // POST LIKES ROUTES
router.patch("/:id/like", auth, postCtrl.likePost);
router.post("/:id/like", postCtrl.countLikes);
router.post("/:id/postLikedByUser", postCtrl.postLikedByUser);

module.exports = router;
