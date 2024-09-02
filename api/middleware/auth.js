import jwt from "jsonwebtoken";
import _Package from "../package/package.js";
import User from "../user/user.js";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(400).send({ message: "Invalid token." });
  }
};

// Verify User as Admin
const verifyAdmin = async (req, res, next) => {
  const requester = req.decoded.email;
  const requesterAccount = await User.findOne({
    email: requester,
  });
  if (requesterAccount.role === "admin") {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// Verify User as Vendor
const verifyVendor = async (req, res, next) => {
  const requester = req.decoded.email;
  const requesterAccount = await User.findOne({
    email: requester,
  });

  const packageData = await _Package.findOne({ _id: req.params.id }).exec();

  if (
    (requesterAccount.role === "vendor" &&
      req.body.vendorId == requesterAccount.vendorCompany) ||
    (requesterAccount.role === "vendor" &&
      packageData.vendorId.toString() == requesterAccount.vendorCompany)
  ) {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

export const auth = { verifyJWT, verifyAdmin, verifyVendor };
