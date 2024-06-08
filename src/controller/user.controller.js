import User from "../models/user.js";

// Example function to get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Example function to create a new user
async function createUser(req, res) {
  const { firstName, lastName, email, role } = req.body;
  const user = new User({ firstName, lastName, email, role });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const UserController = { getUsers, createUser };
