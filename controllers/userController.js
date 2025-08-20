import UserRequest from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const user = new UserRequest({ name, email, department });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

