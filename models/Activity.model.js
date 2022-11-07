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
        type: date
    }, 
    type: {
        type: Enumerator,
    },
    status: {
        type: Enumerator,
    },
    address: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Task = model('Task', taskSchema);

module.exports = Task;