import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const newMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      messages: req.body.text,
    });
    res.status(200).json("message has been sent successfully");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const message = await Message.find({ conversationId });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
