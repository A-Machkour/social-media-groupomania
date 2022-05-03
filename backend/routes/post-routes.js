const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post-controller');
const auth = require('../middleware/auth-middleware');
const upload = require('../middleware/multer-config');

// POST ROUTES CRUD
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth,upload.single("post_picture"), postCtrl.createOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);
// router.put('/:id', auth, postCtrl.updateOnePost);

// // POST LIKES ROUTES
// router.post('/:id/like', auth, postCtrl.likePost);

module.exports=router;
