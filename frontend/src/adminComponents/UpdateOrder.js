import React, { useState } from "react";
import "../css/updateOrder.css";
import toast from "react-hot-toast";

const UpdateOrder = ({
  setshowForm,
  setOrders,
  formData,
  setFormData,
  updateTime,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const messagesTemplate = async (msg, allNumbers) => {
    try {
      const response = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ msg, number: allNumbers }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send messages");
      }

      const data = await response.json();
      console.log("Messages Response:", data);
      toast.success("Messages sent successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisLoading(false);
    }
  };

  const sendWhatsappMsg = async (order) => {
    const allNumbers = [
      `${order.appointment.barberNo}`,
      `0${order.appointment.number}`,
      "03409384412",
    ];

    try {
      const msg =
        order.appointment.startTime !== updateTime
          ? `${
              order.appointment.name
            }, Your appointment time is rescheduled to ${
              order.appointment.startTime
            } for service ${order.appointment.service} at a price of ${
              order.appointment.price
            }, with barber ${order.appointment.barber} on ${new Date(order.date)
              .toISOString()
              .slice(0, 10)}.`
          : `${order.appointment.name}, Your order has been ${
              order.status
            }. Your service: ${order.appointment.service}, price: ${
              order.appointment.price
            }, barber: ${order.appointment.barber} on ${new Date(order.date)
              .toISOString()
              .slice(0, 10)}.`;

      await messagesTemplate(msg, allNumbers);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const res = await fetch(
        `https://luxe-barber-shop-backend.vercel.app/admin/orders/update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update order");

      const updatedOrder = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );

      await sendWhatsappMsg(updatedOrder);
      setshowForm(false);
      toast.success("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  const {
    orderNo,
    date,
    status,
    name,
    number,
    price,
    service,
    startTime,
    barber,
    barberNo,
  } = formData;

  return (
    <div className="order-form-container">
      <h2>Order Update</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Order No:</label>
          <input type="text" name="orderNo" value={orderNo} disabled />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={status} onChange={handleInputChange}>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={name} disabled />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="number" value={number} disabled />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Service:</label>
          <input
            type="text"
            name="service"
            value={service}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="text"
            name="startTime"
            value={startTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Barber:</label>
          <input
            type="text"
            name="barber"
            value={barber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Barber Number:</label>
          <input type="text" name="barberNo" value={barberNo} disabled />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Order"}
        </button>
        <button
          type="button"
          className="submit-btn"
          onClick={() => setshowForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
