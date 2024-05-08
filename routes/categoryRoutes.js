const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/userUtils');

const CategoryController = require('../controllers/CategoryController');

router.get('/', authenticateUser, CategoryController.listCategory);
router.get('/create', authenticateUser, CategoryController.createCategory);
router.get('/update/:id', authenticateUser, CategoryController.updateCategory);
router.post('/create', authenticateUser, CategoryController.createCategorySave);
router.put('/update/:id', authenticateUser, CategoryController.updateCategorySave);
router.delete('/delete/:id', authenticateUser, CategoryController.deleteCategory);

module.exports = router;