const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const TaskController = require('../controllers/TaskController');

router.get('/', autenticarUsuario, TaskController.listTasks);
router.get('/create', autenticarUsuario, TaskController.createTask);
router.get('/update/:id', autenticarUsuario, TaskController.updateTask);
router.post('/create', autenticarUsuario, TaskController.createTaskSave);
router.post('/update/:id', autenticarUsuario, TaskController.updateTaskSave);
router.post('/delete', autenticarUsuario, TaskController.deleteTask);
router.post('/changeStatus', autenticarUsuario, TaskController.changeStatus);

module.exports = router;