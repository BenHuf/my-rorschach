const { Schema } = require('mongoose');
const replySchema = require('./Reply');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

commentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});


const Comment = model('Comment', commentSchema);

module.exports = Comment;