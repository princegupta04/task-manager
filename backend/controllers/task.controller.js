import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo: req.user.role === "admin" && req.body.assignedTo ? req.body.assignedTo : req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS (with pagination)
export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const query = req.user.role === "admin" ? {} : { assignedTo: req.user.id };

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TASK
export const getTaskById = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, assignedTo: req.user.id };
    const task = await Task.findOne(query);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, assignedTo: req.user.id };
    const task = await Task.findOneAndUpdate(
      query,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, assignedTo: req.user.id };
    const task = await Task.findOneAndDelete(query);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, assignedTo: req.user.id };
    const task = await Task.findOneAndUpdate(
      query,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
