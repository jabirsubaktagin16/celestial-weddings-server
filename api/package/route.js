import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { PackageController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Package */
route.post("", auth.verifyJWT, auth.verifyVendor, async (req, res) => {
  try {
    const data = await PackageController.createPackage(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get Package Details by Package Id*/
route.get("/details/:id", async (req, res) => {
  try {
    const result = await PackageController.getPackageDetails(req.params.id);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Get All Packages for Modification for specific vendor */
route.get("/:id", async (req, res) => {
  try {
    const result = await PackageController.viewAllPackagesForVendor(
      req.params.id
    );
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
      const data = await PackageController.updatePackage(req.body);
      res.status(202).send({ response: data });
    } catch (err) {
      res.status(400).send({ response: err.message });
    }
  }
);

/* Delete a Package */
route.delete(
  "/delete/:id",
  auth.verifyJWT,
  auth.verifyVendor,
  async (req, res) => {
    try {
      const id = req.params.id;
      const data = await PackageController.deletePackage(id);
      res.status(200).send({ response: data });
    } catch (err) {
      res.status(500).send({ response: err });
    }
  }
);

export default route;
