import jwt from "jsonwebtoken";
import User from "./user.js";

const jwtGenerate = (email) => {
  const user = User.findOne({ email: email });
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

const findUserForVendorByEmail = (email) => User.findOne({ email: email });

const updateUser = (body) => {
  const user = new User(body);
  return User.updateOne(
    { _id: body._id },
    {
      $set: {
        name: user.name,
        image: user.image,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    }
  );
};

const updateRole = (id, body) => {
  return User.updateOne(
    { _id: id },
    {
      $set: {
        role: body.role,
        vendorCompany: body.vendorCompany,
      },
    }
  );
};

const findAllUsers = () => User.find().populate("vendorCompany");

export const UserController = {
  findUserForVendorByEmail,
  jwtGenerate,
  createUser,
  findUserByEmail,
  updateUser,
  updateRole,
  findAllUsers,
};
