import React from "react";
import "../css/orderDetail.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const { order, service } = location.state || {};
  console.log("order detail", order);
  return (
    <div className="mainDetail">
      <div className="container">
        <div className="header">
          <h1>Thank You!</h1>
          <p>Order Confirmation</p>
        </div>
        <div className="product-info">
          <h2>Product Information</h2>
          {service ? (
            <div className="product-item">
              <img src={service.image} alt="Product" />
              <div className="product-details">
                <h4>{service.title}</h4>
                <p>Quantity: 1</p>
                <p>Price: {service.price} PKR</p>
              </div>
            </div>
          ) : (
            <p>No service selected</p>
          )}
        </div>
        <div className="order-details">
          <div>Order Number: #{order.appointmentNo}</div>
          <div>Date: {new Date(order.date).toISOString().slice(0, 10)}</div>
          <div>Total Amount: {order.appointment.price} PKR</div>
          <div>Payment Method: Cash On Delivery</div>
          <div>
            Appointment: {new Date(order.date).toISOString().slice(0, 10)} at{" "}
            {order.appointment.startTime}
          </div>
        </div>
        <div className="product-details">
          <table>
            <thead>
              <tr>
                <th>Barber</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.appointment.barber}</td>
                <td>{order.appointment.service}</td>
                <td>{order.appointment.price} PKR</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer">
          <p>Subtotal: {order.appointment.price} PKR</p>
          <p>Total: {order.appointment.price} PKR</p>
        </div>
      <div>
        <Link className="btn" to="/">Back to Home</Link>
      </div>
      </div>
    </div>
  );
};

export default OrderDetail;
