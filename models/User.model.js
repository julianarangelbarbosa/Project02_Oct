
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    planner: [{type: Schema.Types.ObjectId, ref: "Task"}],
    profilePictureURL: { 
      type: String,
      default: "/images/Default.png"
    },
  },
    {
      timestamps: true,
    },
  
);

const User = model("User", userSchema);

module.exports = User;
