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

/* Update from a Vendor */
route.patch(
  "/update-vendor/:id",
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

/* Update from User */
route.patch("/update-user/:id", auth.verifyJWT, async (req, res) => {
  try {
    const data = await BookingController.updateBooking(req.params.id, req.body);
    res.status(202).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Get Bookings by VendorId */
route.get("/vendor/:id", async (req, res) => {
  try {
    const result = await BookingController.getBookingByVendor(req.params.id);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/* Get Bookings by User email */
route.get("/user/:email", auth.verifyJWT, async (req, res) => {
  try {
    const result = await BookingController.getBookingsByUser(req.params.email);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default route;
