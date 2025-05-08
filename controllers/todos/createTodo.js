import { TodoValidation } from "../../utils/todoValidation.js";
import Todo from "../../models/todoModel.js";
export async function createTodo(req, res) {
  console.log(req.body,"rbody")
    try {
      const {
        title,
        description,
        dueDate,
        priority,
        status,
        assignedTo,
      } = req.body.data;
  
      const createdBy = req.user.id; // set via auth middleware
  
      // ✅ Validate required fields using utility
      try {
        await TodoValidation({title, dueDate, priority, status});
      } catch (error) {
        console.log(error,"err")
        return res.status(400).json({
          message: error.message || "Validation Error",
        });
      }
  
      // ✅ Create and save the task
      const newTodo = await Todo.create({
        title,
        description,
        dueDate,
        priority,
        status,
        createdBy,
        assignedTo: assignedTo || null, // null = personal task
      });
  
     return res.status(201).json({
        message: "Todo created successfully",
        data: newTodo,
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ message: "Server error" });
    }
  }