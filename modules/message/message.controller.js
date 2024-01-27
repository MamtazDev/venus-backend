import Message from "./message.model.js";

export const addMessage = async (req, res) => {
  try {
    const { leagueId, message } = req.body;

    const newMessage = new Message({ leagueId, message, user: req.user?._id });
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

export const getLeagueMessages = async (req, res) => {
  try {
    const result = await Message.find({ leagueId: req.params.id }).populate(
      "user"
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
