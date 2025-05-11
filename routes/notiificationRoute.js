import express from "express"
import { getNotifications, sendNotifications } from "../controllers/notiicationController.js"


export const NotificationRouter = express.Router()

NotificationRouter.post("/sendNotifications",sendNotifications)
NotificationRouter.get('/getNotifications/:id',getNotifications)
