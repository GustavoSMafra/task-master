const Category = require('../models/Category');

module.exports = class CategoryController {
    
    static async listCategory(req, res) {

        const categoryList = await Category.findAll({raw: true, where: {userId: req.user.id,}});

        res.render('category/list', {categoryList});
    }

    static createCategory(req, res) {

        const iconsList = [
            "bi bi-book",
            "bi bi-bookmark",
            "bi bi-cart",
            "bi bi-pin",
            "bi bi-briefcase",
            "bi bi-capsule",
            "bi bi-heart",
            "bi bi-fuel-pump",
            "bi bi-cash-coin",
            "bi bi-house",
            "bi bi-airplane",
            "bi bi-cake2",
            "bi bi-calendar",
            "bi bi-exclamation-octagon",
            "bi bi-mortarboard",

        ];
        res.render('category/create', {iconList: iconsList});
    }

    static async updateCategory(req, res) {

        const id = req.params.id;
        const category = await Category.findOne({where: {id: id}, raw: true});

        const iconsList = [
            "bi bi-book",
            "bi bi-bookmark",
            "bi bi-cart",
            "bi bi-pin",
            "bi bi-briefcase",
            "bi bi-capsule",
            "bi bi-heart",
            "bi bi-fuel-pump",
            "bi bi-cash-coin",
            "bi bi-house",
            "bi bi-airplane",
            "bi bi-cake2",
            "bi bi-calendar",
            "bi bi-exclamation-octagon",
            "bi bi-mortarboard",

        ];

        res.render('category/update', {category: category, iconList: iconsList});
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
        const id = req.body.id;
        await Category.destroy({where: {id: id}});
        res.redirect('/category');
    }
}