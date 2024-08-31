import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { GalleryController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Add New Image */
route.post("", auth.verifyJWT, auth.verifyAdmin, async (req, res) => {
  try {
    const data = await GalleryController.addImage(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get All Images */
route.get("", async (req, res) => {
  try {
    const result = await GalleryController.getAllImages();
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Delete an Image */
route.delete(
  "/delete/:id",
  auth.verifyJWT,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const data = await GalleryController.deleteImage(req.params.id);
      res.status(200).send({ response: data });
    } catch (err) {
      res.status(500).send({ response: err });
    }
  }
);

export default route;
