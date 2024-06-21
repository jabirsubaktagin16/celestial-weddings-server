import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { PackageController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Package */
route.post("/", auth.verifyJWT, auth.verifyVendor, async (req, res) => {
  try {
    const data = await PackageController.createPackage(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get All Packages for Modification for specific vendor */
route.get("/manage", auth.verifyJWT, auth.verifyVendor, async (req, res) => {
  try {
    const result = await PackageController.viewAllPackagesForVendor(
      req.params.id
    );
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Get All Packages as Offered Services */
route.get("/:serviceName", async (req, res) => {
  try {
    const result = await PackageController.getPackagesByTags(
      req.params.serviceName
    );
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Update a Vendor */
/* route.patch("/update/:id", auth.verifyJWT, auth.verifyVendor, async (req, res) => {
  try {
    const data = await VendorController.updateVendor(req.body);
    res.status(202).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});*/

/* Delete a Vendor */
/* route.delete("/delete/:id", auth.verifyJWT, auth.verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await VendorController.deleteVendor(id);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});  */

export default route;
