import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { VendorController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Vendor */
route.post("", auth.verifyJWT, auth.verifyAdmin, async (req, res) => {
  try {
    const data = await VendorController.createVendor(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get All Vendors */
route.get("", async (req, res) => {
  try {
    const result = await VendorController.getAllVendors();
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Update a Vendor */
route.patch(
  "/update/:id",
  auth.verifyJWT,
  auth.verifyVendor,
  async (req, res) => {
    try {
      const data = await VendorController.updateVendor(req.body);
      res.status(202).send({ response: data });
    } catch (err) {
      res.status(400).send({ response: err.message });
    }
  }
);

/* Delete a Vendor */
route.delete(
  "/delete/:id",
  auth.verifyJWT,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const id = req.params.id;
      const data = await VendorController.deleteVendor(id);
      res.status(200).send({ response: data });
    } catch (err) {
      res.status(500).send({ response: err });
    }
  }
);

export default route;
