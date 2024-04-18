const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../utils/userUtils');

const CommentController = require('../controllers/CommentController');

router.post('/create', autenticarUsuario, CommentController.createCommentSave);
router.put('/update/:id', autenticarUsuario, CommentController.updateCommentSave);
router.delete('/delete', autenticarUsuario, CommentController.deleteComment);

module.exports = router;