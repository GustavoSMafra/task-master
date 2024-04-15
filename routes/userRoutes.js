const express = require('express');
const router = express.Router();
const { semUsuario } = require('../utils/userUtils');

const UserController = require('../controllers/UserController');

router.get('/create', semUsuario, UserController.createUserView);
router.get('/login', semUsuario, UserController.loginUserView);

router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;