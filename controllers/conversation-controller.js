import Conversation from "../models/Conversation.js";

export const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;

    const exist = await Conversation.findOne({
      members: { $all: [reciverId, senderId] },
    });

    if (exist) {
      return res.status(200).json("converation already exist");
    }

    const newConversation = new Conversation({
      members: [reciverId, senderId],
    });
    await newConversation.save();
    res.status(200).json("user saved successfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;

    let conversation = await Conversation.findOne({
      members: { $all: [reciverId, senderId] },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
