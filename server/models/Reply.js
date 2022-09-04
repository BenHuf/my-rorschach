const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
    {
    replyBody: {
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
        }
    },
    {
        toJSON: {
        getters: true
        }
    }
);

const Reply = model('Reply', replySchema);

module.exports = Reply;
