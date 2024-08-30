import mongoose from "mongoose";
import Booking from "./booking.js";

const createBooking = (body) => {
  const booking = new Booking(body);
  return booking.save();
};

const updateBooking = (id, body) => {
  const booking = new Booking(body);
  return Booking.updateOne(
    { _id: id },
    {
      $set: {
        bookingStatus: booking.bookingStatus,
      },
    }
  );
};

const getBookingByVendor = (vendorId) => {
  return Booking.aggregate([
    {
      $lookup: {
        from: "packages", // The collection name for Package model
        localField: "packageId", // Field in Booking to join with Package
        foreignField: "_id", // Field in Package to match
        as: "packageDetails",
      },
    },
    {
      $unwind: "$packageDetails", // Unwind to treat packageDetails as a single object
    },
    {
      $match: {
        "packageDetails.vendorId": new mongoose.Types.ObjectId(vendorId), // Match by vendorId
      },
    },
    {
      $project: {
        brideName: 1,
        groomName: 1,
        email: 1,
        contactNumber: 1,
        eventDate: 1,
        venueName: 1,
        bookingStatus: 1,
        createdAt: 1,
        packageName: "$packageDetails.name", // Include package name
        packagePrice: "$packageDetails.price", // Include package price
      },
    },
    {
      $sort: {
        eventDate: -1, // Sort in descending order based on eventDate
      },
    },
  ])
    .then((bookings) => {
      return bookings; // Return bookings
    })
    .catch((err) => {
      return { error: err.message }; // Return error object
    });
};

export const BookingController = {
  createBooking,
  updateBooking,
  getBookingByVendor,
};
