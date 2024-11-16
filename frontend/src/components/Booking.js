import React, { useContext, useState } from "react";
import "../css/booking.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { productContext } from "../context/productContext/productContext";

const Booking = ({ setShowBooking, service, barber, startTime }) => {
  const { barberNo } = useContext(productContext);
  const [isLoading, setisLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (inputData.phone.length !== 11 || !inputData.phone.startsWith("0")) {
      toast.error("Enter exactly 11 digits, and the number must start with 0");
      setisLoading(false);
      return;
    }

    // Validate inputs
    if (!inputData.name || !inputData.phone) {
      toast.error("Fill all required fields");
      setisLoading(false); // Reset loading state
      return;
    }

    try {
      // Fetch the latest appointment number
      const fetchAppointmentNo = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/orders/latest-appointmentNo"
      );
      const appointNoResponse = await fetchAppointmentNo.json();

      // Get the latest appointment number and ensure it's treated as a number
      let latestAppointNo = appointNoResponse.appointmentNo || 0;
      let newAppointNo = Number(latestAppointNo) + 1; // Increment the number correctly

      // Prepare new appointment data
      const newAppointment = {
        appointmentNo: newAppointNo,
        date: new Date(),
        status: "Processing",
        name: inputData.name,
        number: inputData.phone,
        barber: barber,
        service: service.title,
        price: service.price,
        startTime: startTime,
        barberNo: barberNo,
      };

      // Make the request to book an appointment
      const appointment = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/orders/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAppointment),
        }
      );

      if (!appointment.ok) {
        toast.error("Appointment not booked because some updation");
        setisLoading(false);
        return;
      }

      // Parse the response
      const order = await appointment.json();
      console.log(order);

      setisLoading(false);
      setInputData({
        name: "",
        phone: "",
      });
      toast.success("Your appointment has been booked");

      // send notification on whatsapp
      let encodedMsg = `Dear ${inputData.name},
      Your appointment at LUXE Gentlemen has been successfully booked!
      
      Details of your appointment:
      Service: ${service.title},
      Price: PKR ${service.price},
      Date & Time: ${new Date().toLocaleDateString()} at ${startTime},
      Assigned Barber: ${barber}.
      We look forward to providing you with a top-notch experience. If you need to make any changes to your appointment, feel free to contact us.
      
      Thank you for choosing LUXE Gentlemen.
      
      Best regards,
      LUXE Gentlemen Salon Team`;
      let msg = encodeURIComponent(encodedMsg);
      let allNumbers = [`${barberNo}`, `${inputData.phone}`, "03409384412"];
      try {
        const res = await fetch(`https://luxe-barber-shop-backend.vercel.app/form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify({ number: allNumbers, msg }), // Convert the data to JSON format
        });
        await res.json();
      } catch (error) {
        console.error("Error:", error);
      }
      // Navigate to order detail page or other action
      navigate("/orders/order-detail", { state: { order, service } });
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment, please try again later.");
      setisLoading(false);
    }
  };

  return (
    <div className="bookMain">
      <div className="container">
        <div className="header">
          <h1>Confirmation</h1>
          <button className="btn" onClick={() => setShowBooking(false)}>
            BACK
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputData.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="whatsapp">Your Whatsapp</label>
          <input
            type="number"
            id="whatsapp"
            name="phone"
            value={inputData.phone}
            onChange={handleInput}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btnBook"
          onClick={handleSubmit}
        >
          {isLoading ? "Booking..." : "BOOK NOW"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
