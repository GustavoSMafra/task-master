const Comment = require('../models/Comment');

module.exports = class CommentController {
    
    static async createCommentSave(req, res) {
        const commentData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
        }

        await Comment.create(commentData);
        res.redirect('/comment');
    }

    static async updateCommentSave(req, res) {

        const id = req.params.id;
        const commentData = {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
        }

        await Comment.update(commentData, {where: {id: id}});

        res.redirect('/comment');
    }

    static async deleteComment(req, res) {
        const id = req.body.id;
        await Comment.destroy({where: {id: id}});
        res.redirect('/comment');
    }
}