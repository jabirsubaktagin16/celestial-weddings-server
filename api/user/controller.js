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

const findUserByEmail = (email) => User.findOne({ email: email });

const findUserForVendorByEmail = (email) => User.findOne({ email: email });

const updateUser = (email, body) => {
  return User.updateOne(
    { email: email },
    {
      $set: {
        name: body.name,
        image: body.image,
        phoneNumber: body.phoneNumber,
        address: body.address,
        occupation: body.occupation,
        updatedAt: Date.now(),
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
