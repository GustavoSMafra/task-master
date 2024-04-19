const Checklist = require('../models/Checklist');

module.exports = class ChecklistController {
    
    static async createChecklistSave(req, res) {
        const checklistData = {
            name: req.body.name,
            done: req.body.done,
            taskId: req.body.taskId,
        }

        try {
            const createdTask = await Checklist.create(checklistData);
            res.status(200).json({
                success: true,
                message: "Checklist cadastrado com sucesso",
                data: {
                    checklistId: createdTask.id
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Erro ao cadastrar checklist: ${error.message}`,
                data: {},
            });
        }
    }

    static async deleteChecklist(req, res) {
        const id = req.params.id;
        try {
            const deletedRows = await Checklist.destroy({where: {id: id}});
    
            if (deletedRows > 0) {
                res.status(200).json({
                    success: true,
                    message: `Checklist ID ${id} deletado com sucesso`,
                    data: {}
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Checklist ID ${id} não encontrado`,
                    data: {}
                    
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Erro ao deletar o checklist ID ${id}: ${error.message}`,
                data: {}
            });
        }
    }

    static async changeStatus(req, res) {
        const id = req.params.id;
        const checklistData = {
            done: req.body.done,
        };
    
        try {
            const [updatedRows] = await Checklist.update(checklistData, { where: { id: id } });
    
            if (updatedRows > 0) {
                res.status(200).json({
                    success: true,
                    message: `Checklist ID ${id} atualizado com sucesso`,
                    data: {}
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Checklist ID ${id} não encontrado`,
                    data: {}
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Erro ao atualizar o checklist ID ${id}: ${error.message}`,
                data: {}
            });
        }
    }    
}