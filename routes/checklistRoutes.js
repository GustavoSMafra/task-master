const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const ChecklistController = require('../controllers/ChecklistController');

router.post('/create', autenticarUsuario, ChecklistController.createChecklistSave);
router.put('/update/:id', autenticarUsuario, ChecklistController.updateChecklistSave);
router.put('/change-status/:id', autenticarUsuario, ChecklistController.changeStatus);
router.delete('/delete', autenticarUsuario, ChecklistController.deleteChecklist);

module.exports = router;