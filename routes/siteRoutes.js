const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const SiteController = require('../controllers/SiteController');

router.get('/home', autenticarUsuario,  SiteController.homeView);


module.exports = router;