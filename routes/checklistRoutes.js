const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/userUtils');

const ChecklistController = require('../controllers/ChecklistController');

router.post('/create', authenticateUser, ChecklistController.createChecklistSave);
router.put('/change-status/:id', authenticateUser, ChecklistController.changeStatus);
router.delete('/delete/:id', authenticateUser, ChecklistController.deleteChecklist);

module.exports = router;