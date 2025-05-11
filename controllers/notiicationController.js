import notificationModel from "../models/notificationModel.js";

// sendNotifications function (controller)
export const sendNotifications = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Validate that userId and message are provided
    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    // Create the notification
    const notification = await notificationModel.create({
      user: userId,
      message,
    });
    console.log(notification)

    // Send response back to the client
   return res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// getNotifications function (controller)
export const getNotifications = async (req, res) => {
  console.log("inside notifiactions get")
  try {
 const { id: userId } = req.params;

   
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }


    const notifications = await notificationModel.find({ user: userId })
      .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
      .exec();

    // Check if notifications exist for the user
    if (notifications.length === 0) {
      return res.status(200).json(
        {
          data:[], 
          message: "No notifications found"
         });
    }

    // Send the notifications to the client
    return res.status(200).json(
      {
        data:notifications,
        message:"Notificatons fetched Successfully"
      });
  } catch (error) {
    console.error("Error fetching notifications:", error ? error : error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

