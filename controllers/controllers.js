import User from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const exist = await User.findOne({ sub: req.body.sub });

    if (exist) {
      res
        .status(200)
        .json({ msg: "User already exist with name " + req.body.name });
      return;
    }

    const newUser = await User(req.body);
    await newUser.save().then(console.log("User added successfully"));
    return res.status(200).json(newUser);
  } catch (error) {
    console.log({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
