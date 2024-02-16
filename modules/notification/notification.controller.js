import Notification from "./notification.model.js";

export const addNotification = async (req, res) => {
  try {
    const { leagueId, message, leagueCreatorId } = req.body;

    const newMessage = new Notification({
      leagueId,
      message,
      leagueCreatorId,
    });
    const result = await newMessage.save();
    res.status(200).send({
      success: true,
      message: "Notification added!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
