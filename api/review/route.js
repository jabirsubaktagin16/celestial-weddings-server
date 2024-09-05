import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { ReviewController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Review */
route.post("", async (req, res) => {
  try {
    const data = await ReviewController.createReview(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get Ratings by VendorId */
route.get("/ratings/:id", async (req, res) => {
  try {
    const result = await ReviewController.getVendorRatings(req.params.id);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Get Reviews by VendorId */
route.get("/:id", async (req, res) => {
  try {
    const result = await ReviewController.getVendorReviews(req.params.id);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Get Reviews by UserId */
route.get("/user/:id", auth.verifyJWT, async (req, res) => {
  try {
    const result = await ReviewController.getVendorReviewsByUser(req.params.id);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default route;
