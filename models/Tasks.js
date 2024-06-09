const mongoose = require("mongoose");
const { Schema } = mongoose;

const TasksSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Tasks", TasksSchema);
