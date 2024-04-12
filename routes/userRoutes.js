const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/create', UserController.createUserView);
router.get('/login', UserController.loginUserView);

router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;