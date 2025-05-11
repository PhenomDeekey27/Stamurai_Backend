import express from 'express'
import { getCurrentUser, login, logout, register } from "../controllers/authController.js";

export const Authrouter = express.Router()


Authrouter.post('/register',register)
Authrouter.post('/login',login)
Authrouter.get("/logout",logout)
Authrouter.get("/currentUser",getCurrentUser)



