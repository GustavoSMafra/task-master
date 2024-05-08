const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/userUtils');

const TaskController = require('../controllers/TaskController');

router.get('/', authenticateUser, TaskController.listTasks);
router.get('/create', authenticateUser, TaskController.createTask);
router.get('/update/:id', authenticateUser, TaskController.updateTask);
router.post('/create', authenticateUser, TaskController.createTaskSave);
router.put('/update/:id', authenticateUser, TaskController.updateTaskSave);
router.put('/change-status/:id', authenticateUser, TaskController.changeStatus);
router.delete('/delete/:id', authenticateUser, TaskController.deleteTask);

module.exports = router;