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

export const BookingController = { createBooking, updateBooking };
