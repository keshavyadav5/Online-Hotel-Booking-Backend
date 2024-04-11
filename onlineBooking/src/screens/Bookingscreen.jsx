import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import moment from 'moment';

function Bookingscreen() {
  const params = useParams()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState(null);
  const [roomrent, setroomrent ] = useState(0);
  const { roomid } = useParams();

  const roomids = params.roomid;
  const fromdate = moment(params.fromdate, 'DD-MM-YYYY')
  const todate = moment(params.todate, 'DD-MM-YYYY')
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('http://localhost:3000/api/rooms/getroombyid', { roomid })).data;
        settotalamount(data.rentperday * totaldays);
        setRoom(data);
        setroomrent(room.rentperday)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentuser')).data._id,
      fromdate,
      todate,
      totaldays,
      totalamount
    }
    try{
      const result = await axios.post('http://localhost:3000/api/bookings/bookingroom',bookingDetails);
    }catch(error){}
  }

  return (
    <div>
      {loading ? (
        <h1><Loading /></h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs" >
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt={room.name} className='bigimage' />
            </div>
            <div className="col-md-6" >
            
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : {room.name}</p>
                  <p>From Date : {params.fromdate} </p>
                  <p>To Date : {params.todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total days: {totaldays}</p>
                  <p>Rent per day: {room.rentperday} </p>
                  <p>Total Amount:{totalamount} </p>
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
              </div>

            </div>
          </div>
        </div>
      ) : (<Error />)}
    </div>
  );
}

export default Bookingscreen;
