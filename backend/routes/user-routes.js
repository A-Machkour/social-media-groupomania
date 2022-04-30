const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user-controller');
const auth = require('../middleware/auth-middleware');

router.get('/:id',auth, userCtrl.getUserInfo);
router.put('/:id', auth, userCtrl.updateOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser);
router.patch('/follow/:id', auth, userCtrl.followUser);
//router.patch('/unfollow/:id', userCtrl.unfollowUser);




module.exports = router;