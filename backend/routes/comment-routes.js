const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment-controller');
const auth = require('../middleware/auth-middleware');
const multer = require('../middleware/multer-config');

router.get('/',auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/', auth, multer, commentCtrl.createOneComment);
router.delete('/:id', auth, commentCtrl.deleteOneComment);

module.exports = router;