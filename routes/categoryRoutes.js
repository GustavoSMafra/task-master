const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const CategoryController = require('../controllers/CategoryController');

router.get('/', autenticarUsuario, CategoryController.listCategory);
router.get('/create', autenticarUsuario, CategoryController.createCategory);
router.get('/update/:id', autenticarUsuario, CategoryController.updateCategory);
router.post('/create', autenticarUsuario, CategoryController.createCategorySave);
router.post('/update/:id', autenticarUsuario, CategoryController.updateCategorySave);
router.post('/delete', autenticarUsuario, CategoryController.deleteCategory);

module.exports = router;