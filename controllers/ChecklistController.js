const Checklist = require('../models/Checklist');

module.exports = class ChecklistController {
    
    static async createChecklistSave(req, res) {
        const checklistData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
        }

        await Checklist.create(checklistData);
        res.redirect('/checklist');
    }

    static async updateChecklistSave(req, res) {

        const id = req.params.id;
        const checklistData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
        }

        await Checklist.update(checklistData, {where: {id: id}});

        res.redirect('/checklist');
    }

    static async deleteChecklist(req, res) {
        const id = req.body.id;
        await Checklist.destroy({where: {id: id}});
        res.redirect('/checklist');
    }

    static async changeStatus(req, res) {

    }
}