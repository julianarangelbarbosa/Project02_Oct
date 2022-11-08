const { text } = require('express');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {
        type: String,
    }, 
    type: {
        type: String,
        enum: ['valid', 'invalid']
    },
    status: {
        type: String,
        enum: ['valid', 'invalid']
    },
    address: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Task = model('Task', taskSchema);

module.exports = Task;