import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../Components/Room';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function Homescreen() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get('http://localhost:3000/api/rooms/getallrooms')).data;

        setRooms(data);
        setduplicaterooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0]["$d"]).format("DD-MM-YYYY"))
    settodate(moment(dates[1]["$d"]).format("DD-MM-YYYY"))

    var temprooms = []
    var availability = false
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(moment(moment(dates[0]["$d"]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate))
            && !moment(moment(moment(dates[1]["$d"]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate))
          ) {
            if (
              moment(dates[0]["$d"]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[0]["$d"]).format("DD-MM-YYYY") != booking.todate &&
              moment(dates[1]["$d"]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[1]["$d"]).format("DD-MM-YYYY") != booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if(availability == true || room.currentbookings.length == 0){
        temprooms.push(room)
      }
      setRooms(temprooms)
    }
  }

  return (
    <div classNameName='container'>

      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (<h1><Loading /></h1>
        ) : rooms.length > 1 ? (rooms.map(room => {
          return <div className="col-md-9 mt-2">
            <Room room={room} fromdate={fromdate} todate={todate} />
          </div>
        })
        ) : (<Error />)}
      </div>

    </div>
  );
}

export default Homescreen;
