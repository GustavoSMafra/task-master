const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/userUtils');

const SiteController = require('../controllers/SiteController');

router.get('/', authenticateUser,  SiteController.homeView);


module.exports = router;