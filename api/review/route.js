import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { ReviewController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Review */
route.post("", auth.verifyJWT, async (req, res) => {
  try {
    const data = await ReviewController.createReview(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

export default route;
