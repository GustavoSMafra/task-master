const express = require('express');
const router = express.Router();
const { withoutUser } = require('../utils/userUtils');

const UserController = require('../controllers/UserController');

router.get('/create', withoutUser, UserController.createUserView);
router.get('/login', withoutUser, UserController.loginUserView);
router.get('/logout', UserController.logoutUser);

router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);


module.exports = router;