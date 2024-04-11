const express = require('express');
const app = express();
const mongoose = require('./db');
const Room = require('./models/room');
const roomsRoute = require('./routes/roomsRoute');
const cors = require("cors");
const usersRoute = require('./routes/usersRoute'); 
const bookingroutes = require('./routes/bookingRoute')

app.use(cors());
app.use(express.json())
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingroutes);

app.get("/", async (req, res) => {
  const newRoom = await Room.find();
  res.send(newRoom);
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
