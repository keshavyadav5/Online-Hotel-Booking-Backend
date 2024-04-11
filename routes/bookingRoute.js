const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const moment = require('moment')
const Room = require('../models/room')

router.post('/bookingroom', async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totaldays,
    totalamount
  } = req.body;
  console.log(userid);
  try {
    const newBooking = new Booking({
      name: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format('DD-MM-YYYY'),
      todate: moment(todate).format('DD-MM-YYYY'),
      totaldays,
      totalamount,
      transactionid: '1234',
    });

    const booking = await newBooking.save();
    
    const roomtemp = await Room.findOne({ _id: room._id })

    roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate).format('DD-MM-YYYY'), todate: moment(todate).format('DD-MM-YYYY'), userid : userid, status : booking.status })
    console.log(roomtemp)

    await roomtemp.save();

    res.status(201).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
