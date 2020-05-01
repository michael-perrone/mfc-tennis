const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const User = require("../../models/User");

router.post('/getPlayers', async (req, res) => {
  try {
    let booking = await Booking.findOne({_id: req.body.id})
    return res.status(200).json({players: booking.players})
  } catch(error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    console.log("dwdwd,", req.body, "dwwqdwd")
    let newThingBooked = new Booking({
      bookedBy: req.body.booking.bookedBy,
      thingIds: req.body.booking.thingIds,
      timeStart: req.body.booking.timeStart,
      timeEnd: req.body.booking.timeEnd,
      minutes: req.body.booking.minutes,
      date: req.body.booking.date,
      players: req.body.booking.players
    });
    console.log(newThingBooked)
    await newThingBooked.save();

    if (newThingBooked) {
      const bookings = await Booking.find({
        date: req.body.date
      });
      console.log(bookings)
      res.status(200).json({ newBooking: newThingBooked, bookings });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getthings", async (req, res) => {
  try {
    console.log(req.body.businessId);
    console.log(req.body.date)
    const bookings = await Booking.find({
      businessId: req.body.businessId,
      date: req.body.date
    });
    console.log(bookings)
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookingId });
    let bookings = await Booking.find({
      clubName: req.body.clubName,
      date: req.body.date
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
