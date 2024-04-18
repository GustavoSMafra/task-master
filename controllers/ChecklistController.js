const Checklist = require('../models/Checklist');

module.exports = class ChecklistController {
    
    static async createChecklistSave(req, res) {
        const checklistData = {
            name: req.body.name,
            done: req.body.done == 'on' ? true : false,
            taskId: req.body.taskId,
        }

        await Checklist.create(checklistData);
        res.redirect('/checklist');
    }

    static async updateChecklistSave(req, res) {

        const id = req.params.id;
        const checklistData = {
            name: req.body.name,
            done: req.body.done == 'on' ? true : false,
            taskId: req.body.taskId,
        }

        await Checklist.update(checklistData, {where: {id: id}});
    }

    static async deleteChecklist(req, res) {
        const id = req.body.id;
        await Checklist.destroy({where: {id: id}});
        res.redirect('/checklist');
    }

    static async changeStatus(req, res) {
        const id = req.params.id;
        const checklistData = {
            done: req.body.done == 'on' ? true : false,
        }

        await Checklist.update(checklistData, {where: {id: id}});
    }
}