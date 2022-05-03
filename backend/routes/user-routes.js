const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user-controller');
const auth = require('../middleware/auth-middleware');
const upload = require('../middleware/multer-config');

router.get('/:id',auth, userCtrl.getUserInfo);
router.put('/:id', auth, upload.single("profil_picture"), userCtrl.updateOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser);
router.patch('/follow/:id', auth, userCtrl.followUser);
//router.patch('/unfollow/:id', userCtrl.unfollowUser);

//upload image



module.exports = router;