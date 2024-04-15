const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = class TaskController {
    
    static async listTasks(req, res) {

        const taskListCreated = await Task.findAll({raw: true, where: {status: 0}});
        const taskListWorking = await Task.findAll({raw: true, where: {status: 1}});
        const taskListPaused = await Task.findAll({raw: true, where: {status: 2}});
        const taskListDone = await Task.findAll({raw: true, where: {status: 3}});

        res.render('task/list', {taskListCreated, taskListWorking, taskListPaused, taskListDone});
    }

    static createTask(req, res) {
        const statusList = Task.statusList;
        const categoryList = Category.findAll({raw: true});
        res.render('task/create', {statusList: statusList, categoryList: categoryList});
    }

    static async updateTask(req, res) {

        const id = req.params.id;
        const task = await Task.findOne({where: {id: id}, raw: true});
        const statusList = Task.statusList;
        const categoryList = Category.findAll({raw: true});
        res.render('task/update', {task: task, statusList: statusList, categoryList: categoryList});
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            categoryId: req.body.category,
            userId: req.user.id,
            status: req.body.status,
        }

        await Task.create(task);
        res.redirect('/task');
    }

    static async updateTaskSave(req, res) {

        const id = req.params.id;

        const taskData = {
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

    }
}