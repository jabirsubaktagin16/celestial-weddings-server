import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { UserController } from "./controller.js";

const route = express.Router({ mergeParams: true });

//Middleware
route.use(cors());
route.use(express.json());

/* Token Generate and Store User Email in Database */
route.post("/jwt", async (req, res) => {
  try {
    const data = await UserController.jwtGenerate(req?.body.email);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Post New User in the database */
route.post("/", async (req, res) => {
  try {
    const data = await UserController.findUserByEmail(req.body.email);
    if (data === null) {
      const newUser = await UserController.createUser(req.body);
      res.status(201).send({ response: newUser });
    } else {
      res.status(200).send({ response: data });
    }
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

/* Get User Information by Email */
route.get("/:email", auth.verifyJWT, async (req, res) => {
  try {
    const result = await UserController.findUserByEmail(req.params.email);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Update User Information */
route.patch("/update/:email", auth.verifyJWT, async (req, res) => {
  try {
    const data = await UserController.updateUser(req.params.email, req.body);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Get All User for Admin */
route.get("", async (req, res) => {
  try {
    const users = await UserController.findAllUsers();
    res.status(200).send({ response: users });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Update User Role by Admin */
route.patch("/update-role/:id", async (req, res) => {
  try {
    const data = await UserController.updateRole(req.params.id, req.body);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Checking if the user is Admin */
route.get("/admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const info = await UserController.findUserByEmail(email);
    const adminCheck = info?.role === "admin";
    res.status(200).send({ admin: adminCheck });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Checking if the user is vendor */
route.get("/vendor/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const info = await UserController.findUserByEmail(email);
    const vendorCheck = info?.role === "vendor";
    res.status(200).send({ vendor: vendorCheck });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

export default route;
