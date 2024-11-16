import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router";
import image from "../assets/images/team-image-1.jpg";
import "../css/singleService.css";
import Booking from "./Booking";
import toast from "react-hot-toast";
import Barbers from "./Barbers";
import { productContext } from "../context/productContext/productContext";

const SingleService = () => {
  const {setBarberNo}=useContext(productContext)
  const [service, setService] = useState({});
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [barber, setBarber] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [appointmentNo, setappointmentNo] = useState(0);
  const [barberAppointments, setBarberAppointments] = useState(0); // To track the number of appointments

  const handleBooking = async () => {
    if (startTime === "") {
      toast.error("Please select a start time before booking.");
      return;
    }

    // Check if the barber already has 8 appointments for the selected date
    if (barberAppointments >= 8) {
      toast.error(
        `Barber ${barber} already has 8 appointments today. Please select another date or barber.`
      );
      return;
    }
    // Proceed with the booking if the limit is not reached
    setShowBooking(true);
  };

  // Fetch the number of appointments for the barber on the selected date
  useEffect(() => {
    const fetchBarberAppointments = async () => {
      try {
        const date = new Date(value);
        // Format to ISO string and extract desired format
        const formattedDate = date.toISOString().slice(0, 23);
        const res = await fetch(
          `https://luxe-barber-shop-backend.vercel.app/orders/appointments/barber/${barber}?date=${formattedDate}`
        );
        const data = await res.json();
        setBarberAppointments(data.appointmentCount); // Store the count
      } catch (error) {
        console.log("Error fetching barber's appointments:", error);
      }
    };

    if (barber && value) {
      fetchBarberAppointments(); // Fetch appointments whenever a barber or date is selected
    }
  }, [barber, value]);

  const handleBarber = (value) => {
    setBarber(value);
    setShowCalender(true);
    toast.success(`You are selected ${value}`);
  };

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await fetch(
          `https://luxe-barber-shop-backend.vercel.app/services/single-service/${id}`
        );
        const service = await res.json();
        setService(service);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    getService();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container mainSingle">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col singleCard">
            <div
              className="card card-with-bg"
              style={{
                backgroundImage: `url(${
                  service.image ? service.image : image
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text d-flex justify-content-around">
                  Price___ {service.price} PKR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Images /> */}
      <div className="appointment">
        <h1>Book an Appointment</h1>
        <div className="container">
          {showBooking ? (
            <Booking
              setShowBooking={setShowBooking}
              service={service}
              barber={barber}
              startTime={startTime}
              appointmentNo={appointmentNo}
              barberAppointments={barberAppointments}
            />
          ) : (
            <>
              <div className="barber-selection">
                <Barbers
                  handleBarber={handleBarber}
                  setBarberNo={setBarberNo}
                />

                {showCalender ? (
                  <div className="calendar-section">
                    {/* Calendar with disabled previous dates */}
                    <div className="form-group">
                      <label>Set Date:</label>
                      <input
                        type="date"
                        name="date"
                        value={value}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="calPara">Once select barber then select date</p>
                )}

                {value ? (
                  <>
                    <div className="form-group timing">
                      <label style={{ marginTop: "1rem" }}>Start Time:</label>
                      <input
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                  </>
                ) : null}

                {startTime ? (
                  <div className="appointmentDetail">
                    <h2>Appointment Details:</h2>
                    <div className="cutting-info">
                      <h6 className="service-title">
                        {service.title} -{" "}
                        <span className="barber-name">{barber}</span>
                      </h6>
                      <p className="appointment-date">
                        {value.toString().slice(0, 15)}
                      </p>
                      <p className="appointment-time">
                        {startTime ? startTime.toString() : ""}
                        {/* {endTime ? endTime.toString() : ""} */}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="price-section">
                  <p>Price: {service.price} PKR</p>
                </div>
              </div>
              <div className="next-button">
                <button className="btn-next" onClick={handleBooking}>
                  NEXT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleService;
