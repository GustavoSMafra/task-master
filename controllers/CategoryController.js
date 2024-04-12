const Category = require('../models/Category');

module.exports = class CategoryController {
    
    static async listCategory(req, res) {

        const categoryList = await Category.findAll({raw: true});

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
        }

        await Category.update(categoryData, {where: {id: id}});

        res.redirect('/category');
    }

    static async deleteCategory(req, res) {
        const id = req.body.id;
        await Category.destroy({where: {id: id}});
        res.redirect('/category');
    }
}