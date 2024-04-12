const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const CommentController = require('../controllers/CommentController');

router.post('/create', autenticarUsuario, CommentController.createCommentSave);
router.post('/update/:id', autenticarUsuario, CommentController.updateCommentSave);
router.post('/delete', autenticarUsuario, CommentController.deleteComment);

module.exports = router;