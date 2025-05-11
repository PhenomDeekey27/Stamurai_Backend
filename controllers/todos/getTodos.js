import Todo from "../../models/todoModel.js";
import User from "../../models/userModel.js";




// controllers for todos now 

export const  getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Check access
    if (
      todo.createdBy.toString() !== req.user.id &&
      todo.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to view this todo' });
    }

    res.status(200).json({
      data:todo,
      message:"Todo by id fetched successfully"
    });
  } catch (err) {
    res.status(500).json(
      { 
        error:err ? err : err.message
       });
  }
};


// Get todos created by me
export const getTodosCreatedByMe = async (req, res) => {
  try {
    console.log("mytodos", "req.userid",req.user.id)
    const todos = await Todo.find({ createdBy: req.user.id });
    res.status(200).json({
      data:todos,
      message:"Todos created by me fetched successfully"
    });
  } catch (err) {
    res.status(500).json(
      { 
        error:err ? err : err.message
       });
  }
};

// Get todos assigned to me
export const getTodosAssignedToMe = async (req, res) => {
  try {
    const todos = await Todo.find({ assignedTo: req.user.id });
    res.status(200).json({
      data:todos,
      message:"Assigned Todos fetched Successfully"
    });
  } catch (err) {
    res.status(500).json(
      { 
        error:err ? err : err.message
       });
  }
};

// Get overdue todos
export const getOverdueTodos = async (req, res) => {
  try {
    const today = new Date();
    const todos = await Todo.find({
      assignedTo: req.user.id,
      dueDate: { $lt: today },
      status: { $ne: 'completed' }
    });
    return res.status(200).json({
      data:todos,
      message:"Ourdue todos by user fetched Successfully"
    });
  } catch (err) {
    res.status(500).json(
      { 
        error:err ? err : err.message
       });
  }
};

//get all todos
export const getAllusers = async(req,res) =>{
  try {
    const getUsers = await User.find()
    return res.status(200).json({
      data:getUsers,
      message:"user fetched succesfully"
    })
    
  } catch (error) {
    return res.status(400).json({
      error:error ? error : error.message
    })
    
  }

}

// Get all todos either created by or assigned to the user
export const getAllUserTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    const todos = await Todo.find({
      $or: [
        { createdBy: userId },
        { assignedTo: userId }
      ]
    });

    res.status(200).json({
      data:todos,
      message:"todo fetched Successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(
      { 
        error:err ? err : err.message
       });
  }
};


