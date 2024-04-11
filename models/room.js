const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maxCount: {
    type: Number,
  },
  phonenumber: {
    type: Number,
    required: true
  },
  rentperday: {
    type: String,
    required: true
  },
  imageurls: [],
  currentbookings: [],
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const Room = mongoose.model("room", roomSchema);

module.exports = Room;