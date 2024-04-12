const Task = require('../models/Task');

module.exports = class TaskController {
    
    static async listTasks(req, res) {

        const taskList = await Task.findAll({raw: true});

        res.render('task/list', {taskList});
    }

    static createTask(req, res) {
        res.render('task/create');
    }

    static async updateTask(req, res) {

        const id = req.params.id;
        const task = await Task.findOne({where: {id: id}, raw: true});

        res.render('task/update', {task: task});
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            categoryId: req.body.category,
            userId: req.user.id,
            status: 1,
        }

        await Task.create(task);
        res.redirect('/task');
    }

    static async updateTaskSave(req, res) {

        const id = req.params.id;

        const task = {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            categoryId: req.body.category,
            userId: req.user.id,
            status: 1,
        }

        await Task.update(taskData, {where: {id: id}});

        res.redirect('/task');
    }

    static async deleteTask(req, res) {
        const id = req.body.id;
        await Task.destroy({where: {id: id}});
        res.redirect('/task');
    }

    static async changeStatus(req, res) {
        const id = req.body.id;

        const taskData = {
            done: req.body.done === '0' ? true : false,
        }

        await Task.update(taskData, {where: {id: id}});
        res.redirect('/task');
    }
}