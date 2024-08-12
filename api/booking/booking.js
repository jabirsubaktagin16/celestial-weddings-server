import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  eventDate: { type: Date, required: true },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  venueName: { type: String },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed"],
    required: true,
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default model("Booking", bookingSchema);
