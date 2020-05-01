const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  type: String,
  timeStart: String,
  timeEnd: String,
  bookedBy: String,
  thingIds: [String],
  minutes: String,
  businessName: String,
  date: String,
  players: [String]
});

const Booking = mongoose.model("booking", BookingSchema);

module.exports = Booking;
