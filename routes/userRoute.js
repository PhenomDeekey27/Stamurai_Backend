import express from 'express'
import { login, logout, register } from "../controllers/authController.js";

export const Authrouter = express.Router()


Authrouter.post('/register',register)
Authrouter.post('/login',login)
Authrouter.get("/logout",logout)



