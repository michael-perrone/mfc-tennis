const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "booking"
  },
  admin: {
    type: Boolean,
    default: false
  },
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = User = mongoose.model("user", UserSchema);
