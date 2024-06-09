const asyncHandler = require("../middleware/async-handler");
const Tasks = require("../models/Tasks");
const { createCustomError } = require("../errors/custom-errors");

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Tasks.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: "No task with id: " + req.params.id });
  }
  res.status(200).json({ task });
});

const editTask = asyncHandler(async (req, res) => {
  const task = await Tasks.findOneAndUpdate({ _id: req.params.id }, req.body);

  if (!task) {
    return res.status(404).json({ msg: "No task with id: " + req.params.id });
  }
  return res.status(200).json({ task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Tasks.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ msg: "No task with id: " + req.params.id });
  }
  res.status(200).json({ task });
});

const getTask = asyncHandler(async (req, res, next) => {
  const task = await Tasks.findById(req.params.id);
  if (!task) {
    return next(createCustomError("No task with id: " + req.params.id, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  editTask,
};
