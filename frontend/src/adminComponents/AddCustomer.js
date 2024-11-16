import React, { useState } from "react";
import "../css/addCustomer.css";
import toast from "react-hot-toast";

const AddCustomer = ({ setShowCustomer, setOrders }) => {
  const [formData, setFormData] = useState({
    service: "",
    barber: "",
    name: "",
    number: "",
    barberNo: "",
    startTime: "",
    price: "",
    date: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fetch the latest appointment number
      const response = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/orders/latest-appointmentNo"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the latest appointment number.");
      }

      const { appointmentNo: latestAppointNo = 0 } = await response.json();
      const newAppointNo = Number(latestAppointNo) + 1;

      // Create new appointment data
      const newAppointment = {
        appointmentNo: newAppointNo,
        status: "Processing",
        ...formData,
      };

      // Send POST request to book the appointment
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
        throw new Error("Failed to book the customer.");
      }

      const order = await appointment.json();
      setOrders((prevOrders) => [...prevOrders, order]);
      toast.success("Customer added successfully!");
      setIsLoading(false);
      setShowCustomer(false);

      // Reset the form
      setFormData({
        service: "",
        barber: "",
        name: "",
        number: "",
        barberNo: "",
        startTime: "",
        price: "",
      });
    } catch (error) {
      console.error("Error booking customer:", error);
      toast.error("Error booking customer, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-customer-form-container">
      <h2>Add Customer</h2>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="services">Services</label>
          <input
            id="services"
            className="form-control"
            placeholder="Enter Service"
            name="service"
            value={formData.service}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="barber">Provider</label>
          <select
            name="barber"
            id="barber"
            placeholder="Enter Provider Name"
            value={formData.barber}
            onChange={handleInput}
          >
            <option value="" disabled>
              Select A Barber
            </option>
            <option value="Usman Shabir">Usman Shabir</option>
            <option value="Haider Ali">Haider Ali</option>
            <option value="Mubashir Ali">Mubashir Ali</option>
            <option value="Hassan Ali">Hassan Ali</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter Username"
            name="name"
            value={formData.name}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-number">User Number</label>
          <input
            type="text"
            id="user-number"
            className="form-control"
            placeholder="Enter User Number"
            name="number"
            value={formData.number}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            id="start-time"
            className="form-control"
            name="startTime"
            value={formData.startTime}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            placeholder="Enter Price"
            name="price"
            value={formData.price}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Customer"}
        </button>
        <button
          type="button"
          className="btn-submit mt-2"
          onClick={() => setShowCustomer(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
