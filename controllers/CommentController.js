const Comment = require('../models/Comment');

module.exports = class CommentController {
    
    static async createCommentSave(req, res) {
        const commentData = {
            text: req.body.text,
            taskId: req.body.taskId,
            userId: req.user.id,
        }

        await Comment.create(commentData);
    }

    static async updateCommentSave(req, res) {

        const id = req.params.id;
        const commentData = {
            text: req.body.text,
            taskId: req.body.taskId,
            userId: req.user.id,
        }

        await Comment.update(commentData, {where: {id: id}});
    }

    static async deleteComment(req, res) {
        const id = req.body.id;
        await Comment.destroy({where: {id: id}});
    }
}