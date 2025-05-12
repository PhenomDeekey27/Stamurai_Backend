import Todo from "../../models/todoModel.js";

export async function deleteTodo(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        status:401, 
        message: "Not authorized to delete this todo"
       });
    }

    const removedTodo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Todo removed successfully",
      data: removedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
