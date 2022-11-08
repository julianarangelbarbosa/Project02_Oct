const { text } = require('express');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
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
        enum: ['Work', 'Personal', 'Family', 'School', 'Leisure']
    },
    status: {
        type: String,
        enum: ['In process', 'Done']
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