import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();

  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState()
  const [timings, setTimings] = useState()
  const [isAvailiable, setIsAvailiable] = useState()

  // user data for login
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      // res.status().send({message:"", success: false})
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstname} {doctors.lastname}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation} </h4>
            {/* <h4>
              Timings: {doctors.timings[0]} - {doctors.timings[1]}
            </h4> */}
            <div className="d-flex flex-column w-50">
                <DatePicker className='m-2' format="DD-MM-YYYY" onClick={(value)=> setDate(moment(value).format('DD-MM-YYYY'))}/>
                <TimePicker.RangePicker format="HH:mm" className='m-2' onClick={(values)=> setTimings([
                    moment(values[0]).format("HH:mm"),
                    moment(values[1]).format("HH:mm")
                ])}/>
                <button className="btn btn-primary mt-2">Check Availability</button>
            </div>
          </div>            
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
