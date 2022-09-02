const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const commentSchema = require('./Comment')



const picSchema = new Schema(
  {
    pngString:{
      type: String,
      required: true,
      unique: true,
    },
    comments: [commentSchema],
    collaborators: [
      {
        username:{
          type: String,
          required: true
        }
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  }
)

const Pic = model('Pic', picSchema);

module.exports = Pic;