import jwt from "jsonwebtoken";
import User from "./user.js";

const jwtGenerate = (email) => {
  const user = findOne({ email: email });
  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return { accessToken: token };
  }
  return res.status(403).send({ accessToken: "" });
};

const createUser = (body) => {
  const user = new User(body);
  return user.save();
};

const findUserByEmail = (email) => User.find({ email: email });

const updateUser = (body) => {
  const user = new User(body);
  return User.updateOne(
    { _id: body._id },
    {
      $set: {
        email: user.email,
        location: user.location,
        occupation: user.occupation,
        img: user.img,
        name: user.name,
        contactNo: user.contactNo,
      },
    }
  );
};

const findAllUsers = () => User.find().toArray();

export const UserController = {
  jwtGenerate,
  createUser,
  findUserByEmail,
  updateUser,
  findAllUsers,
};
