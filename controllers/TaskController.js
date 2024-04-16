const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = class TaskController {
    
    static async listTasks(req, res) {

        const taskListCreated = await Task.findAll({
            where: { status: 0, userId: req.user.id },
            include: {
                model: Category,
                attributes: [
                    ['name', 'categoryName'], // Alias para 'name'
                    ['color', 'categoryColor'], // Alias para 'color'
                    ['icon', 'categoryIcon'] // Alias para 'icon'
                ]
            },
        });

        const taskListCreatedArray = taskListCreated.map(task => task.toJSON());
        
        const taskListWorking = await Task.findAll({
            where: { status: 1, userId: req.user.id },
            include: {
                model: Category,
                attributes: [
                    ['name', 'categoryName'], 
                    ['color', 'categoryColor'],
                    ['icon', 'categoryIcon'] 
                ]
            },
        });

        const taskListWorkingArray = taskListWorking.map(task => task.toJSON());

        const taskListPaused = await Task.findAll({
            where: { status: 2, userId: req.user.id },
            include: {
                model: Category,
                attributes: [
                    ['name', 'categoryName'],
                    ['color', 'categoryColor'],
                    ['icon', 'categoryIcon']
                ]
            },
        });

        const taskListPausedArray = taskListPaused.map(task => task.toJSON());

        const taskListDone = await Task.findAll({
            where: { status: 3, userId: req.user.id },
            include: {
                model: Category,
                attributes: [
                    ['name', 'categoryName'],
                    ['color', 'categoryColor'],
                    ['icon', 'categoryIcon']
                ]
            },
        });

        const taskListDoneArray = taskListDone.map(task => task.toJSON());

        res.render('task/list', {taskListCreatedArray, taskListWorkingArray, taskListPausedArray, taskListDoneArray});
    }

    static async createTask(req, res) {
        const statusList = await Task.statusList;
        const categoryList = await Category.findAll({raw: true, where: {userId: req.user.id}});
        res.render('task/create', {statusList: statusList, categoryList: categoryList});
    }

    static async updateTask(req, res) {

        const id = req.params.id;
        const task = await Task.findOne({where: {id: id}, raw: true});
        const statusList = Task.statusList;
        const categoryList = await Category.findAll({raw: true, where: {userId: req.user.id}});
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
            status: req.body.status,
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