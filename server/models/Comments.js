const { Schema, model} = require('mongoose');

const CommentSchema = new Schema(
    {
        username: {
            type: String,
        },
        commentBody: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
