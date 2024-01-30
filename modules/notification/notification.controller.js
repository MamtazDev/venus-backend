import Notification from "./notification.model";

export const addNotification = async (req, res) => {
  try {
    const { leagueId, message } = req.body;

    const newMessage = new Notification({
      leagueId,
      message,
      user: req.user?._id,
    });
    const result = await newMessage.save();
    res.status(200).send({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
