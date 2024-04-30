const Category = require('../models/Category');

module.exports = class CategoryController {
    
    static async listCategory(req, res) {

        const categoryList = await Category.findAll({raw: true, where: {userId: req.user.id}});

        res.render('category/list', {categoryList});
    }

    static createCategory(req, res) {
        res.render('category/create');
    }

    static async updateCategory(req, res) {

        const id = req.params.id;
        const category = await Category.findOne({where: {id: id}, raw: true});

        res.render('category/update', {category: category});
    }

    static async createCategorySave(req, res) {
        const categoryData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
            userId: req.user.id,
        }

        await Category.create(categoryData);
        res.redirect('/category');
    }

    static async updateCategorySave(req, res) {

        const id = req.params.id;
        const categoryData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
            userId: req.user.id,
        }

        await Category.update(categoryData, {where: {id: id}});

        res.redirect('/category');
    }

    static async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            const deletedRows = await Category.destroy({where: {id: id}});
    
            if (deletedRows > 0) {
                res.status(200).json({
                    success: true,
                    message: `Categoria ${id} deletada com sucesso`,
                    data: {}
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Categoria ${id} não encontrado`,
                    data: {}
                    
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Erro ao deletar a Categoria ${id}: ${error.message}`,
                data: {}
            });
        }
    }
}