const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.send(rooms);

  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

router.post('/getroombyid', async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    return res.send(room);

  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

module.exports = router