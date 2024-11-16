import React, { useState } from "react";
import "../css/orderTable.css"; // Import your CSS for table styling
import UpdateOrder from "./UpdateOrder";
import toast from "react-hot-toast";

const OrderTable = ({ orders, setOrders }) => {
  const [showForm, setshowForm] = useState(false);
  const [updateTime, setupdateTime] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    orderNo: "",
    date: "",
    status: "",
    name: "",
    number: "",
    price: "",
    service: "",
    startTime: "",
    barber: "",
    barberNo: "",
  });

  const handleUpdate = (orders) => {
    setFormData({
      id: orders._id,
      orderNo: orders?.appointmentNo || "",
      date: orders?.date
        ? new Date(orders.date).toISOString().slice(0, 10)
        : "",
      status: orders?.status || "",
      name: orders?.appointment?.name || "",
      number: orders?.appointment?.number || "",
      price: orders?.appointment?.price || "",
      service: orders?.appointment?.service || "",
      startTime: orders?.appointment?.startTime || "",
      barber: orders?.appointment?.barber || "",
      barberNo: orders?.appointment?.barberNo || "",
    });
    setupdateTime(orders?.appointment?.startTime);
    setshowForm(true);
  };

  //! delete order
  const handleDelete = async (order) => {
    try {
      const res = await fetch(
        `https://luxe-barber-shop-backend.vercel.app/admin/orders/delete/${order._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedOrder = await res.json();
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== updatedOrder._id)
      );
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order for some server error");
    }
  };
  return showForm ? (
    <UpdateOrder
      setshowForm={setshowForm}
      setOrders={setOrders}
      formData={formData}
      setFormData={setFormData}
      updateTime={updateTime}
    />
  ) : (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Services</th>
            <th>Provider</th>
            <th>Username</th>
            <th>User Number</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.appointment.service}</td>
              <td>{order.appointment.barber}</td>
              <td>{order.appointment.name}</td>
              <td>{order.appointment.number}</td>
              <td>
                {order.date
                  ? new Date(order.date).toISOString().slice(0, 10)
                  : ""}
              </td>
              <td>{order.appointment.startTime}</td>
              <td>{order.appointment.price}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleUpdate(order)}>Edit</button>
                <button onClick={() => handleDelete(order)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
