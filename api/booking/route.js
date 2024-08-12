import cors from "cors";
import express from "express";
import { auth } from "../middleware/auth.js";
import { BookingController } from "./controller.js";

const route = express();

// Middleware
route.use(cors());
route.use(express.json());

/* Create New Booking */
route.post("", auth.verifyJWT, async (req, res) => {
  try {
    const data = await BookingController.createBooking(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Update a Vendor */
route.patch(
  "/update/:id",
  auth.verifyJWT,
  auth.verifyVendor,
  async (req, res) => {
    try {
      const data = await BookingController.updateBooking(
        req.params.id,
        req.body
      );
      res.status(202).send({ response: data });
    } catch (err) {
      res.status(400).send({ response: err.message });
    }
  }
);

export default route;
