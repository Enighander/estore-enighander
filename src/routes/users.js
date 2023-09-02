const express = require('express');
const router = express.Router();
const {registerUser,loginUser,profileUser,refreshToken} = require('../controllers/user.js')
const {protect} = require('../middlewares/auth.js')

router.post ('/register',registerUser);
router.post ('/login',loginUser);
router.post ('/refresh-token',refreshToken);
router.get ('/profile',protect,profileUser);







module.exports = router