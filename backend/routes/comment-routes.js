const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment-controller');
const auth = require('../middleware/auth-middleware');

router.get('/',auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/', auth,  commentCtrl.createOneComment);
router.delete('/:id', auth, commentCtrl.deleteOneComment);

module.exports = router;