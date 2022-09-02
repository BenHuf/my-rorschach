const router = require('express').Router();
const {
    addComment,
    removeComment,
} = require('../../controllers/comment-controller');

// /api/comments/<userId>
router.route('/:userId').post(addComment);

// /api/comments/<userId>/<commentId>
router
    .route('/:userId/:commentId')
    .delete(removeComment)

module.exports = router;