const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment-controller");
const { auth } = require("../middleware/auth-middleware");

router.get("/:id/getallcomments", commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.get("/:id/user", commentCtrl.getCommentUsername);
router.post("/", commentCtrl.createOneComment);
router.delete("/:id", auth, commentCtrl.deleteOneComment);

module.exports = router;
