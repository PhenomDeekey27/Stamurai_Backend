import Todo from "../../models/todoModel.js";
import User from "../../models/userModel.js";
import notificationModel from "../../models/notificationModel.js";
import mongoose from "mongoose";

export async function assignTodo(req, res) {
  try {
    const { todoId } = req.params;
    const { assignedTo } = req.body;

    // ✅ Validate todoId and assignedTo
    if (!mongoose.Types.ObjectId.isValid(todoId) || !mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: "Invalid ID(s) provided." });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    // ✅ Only allow the creator to assign
    if (todo.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to assign this task." });
    }

    // ✅ Check if assignedTo user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found." });
    }

    // ✅ Update assignedTo
    todo.assignedTo = assignedTo;
    await todo.save();

    // ✅ Create notification
    await notificationModel.create({
      user: assignedTo,
      message: `You have been assigned a new task: "${todo.title}"`,
    });

    return res.status(200).json({
      message: "Todo assigned successfully.",
      data: todo,
    });
  } catch (error) {
    console.error("Error assigning todo:", error);
    res.status(500).json({ message: "Server error" });
  }
}
