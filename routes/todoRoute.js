import express from 'express'
import { getAllusers, getAllUserTodos, getOverdueTodos,getTodoById , getTodosAssignedToMe , getTodosCreatedByMe } from '../controllers/todos/getTodos.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { createTodo } from '../controllers/todos/createTodo.js'
import { updateTodos } from '../controllers/todos/updateTodo.js'
import { deleteTodo } from '../controllers/todos/deleteTodo.js'
import { assignTodo } from '../controllers/todos/assignTodo.js'

export const TodoRouter = express.Router()

TodoRouter.post("/create-todo",verifyToken,createTodo)
TodoRouter.get("/get-my-todos",verifyToken,getTodosCreatedByMe)
TodoRouter.get("/get-todo-byId/:id",verifyToken,getTodoById)
TodoRouter.get("/get-assigned-todos",verifyToken,getTodosAssignedToMe)
TodoRouter.get("/get-overdue-todos",verifyToken,getOverdueTodos)
TodoRouter.get("/get-user-todos",verifyToken,getAllUserTodos)
TodoRouter.put("/update-todos/:id",verifyToken,updateTodos)
TodoRouter.delete('/delete-user-todo/:id',verifyToken,deleteTodo)
TodoRouter.put("/assign-todo",verifyToken,assignTodo)
TodoRouter.get("/get-all-user",verifyToken,getAllusers)