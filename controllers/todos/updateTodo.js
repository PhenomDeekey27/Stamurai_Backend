import Todo from "../../models/todoModel.js";

export async function updateTodos(req, res) {
  console.log(req.params.id)
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: 'Todo not found' });
  
      if (
        todo.createdBy.toString() !== req.user.id &&
        todo.assignedTo?.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: 'Not authorized to update this todo' });
      }
  
      const allowedFields = ['title', 'description', 'dueDate', 'priority', 'status', 'assignedTo'];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          todo[field] = req.body[field];
        }
      });
  
      await todo.save();
      res.status(200).json({ message: 'Todo updated successfully', data: todo });
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  