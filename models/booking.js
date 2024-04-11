const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  roomid: {
    type : String,
    required : true
  },
  userid: {
    type : String,
    required : true
  },
  fromdate: {
    type : String,
    required : true
  },
  todate: {
    type : String,
    required : true
  },
  totalamount: {
    type : Number,
    required : true
  },
  totaldays: {
    type : Number,
    required : true
  },
  transactionid: {
    type : String,
    required : true
  },
  status: {
    type : String,
    required : true,
    default : 'booked'
  }
},{
  timstamps : true
})

const bookingmodel = mongoose.model('bookings', bookingSchema)

module.exports = bookingmodel