const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const ChecklistController = require('../controllers/ChecklistController');

router.post('/create', autenticarUsuario, ChecklistController.createChecklistSave);
router.post('/update/:id', autenticarUsuario, ChecklistController.updateChecklistSave);
router.post('/delete', autenticarUsuario, ChecklistController.deleteChecklist);
router.post('/change-status/:id', autenticarUsuario, ChecklistController.changeStatus);

module.exports = router;