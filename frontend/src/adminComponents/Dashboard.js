import React, { useState, useEffect, useContext } from "react";
import "../css/dashboard.css"; // Import your CSS for styling
import OrderTable from "./OrderTable"; // Import the OrderTable component
import Navbar from "../components/Navbar";
import { productContext } from "../context/productContext/productContext";
import toast from "react-hot-toast";
import FeedbackTable from "./FeedbackTable";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [ordersDate, setOrdersDate] = useState([]);
  const { logout, user } = useContext(productContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("Processing");

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://luxe-barber-shop-backend.vercel.app/admin/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by category
  const filteredOrders = orders.filter(
    (order) => order.status.toLowerCase() === category.toLowerCase()
  );

  // Search function
  const searchOrders = filteredOrders.filter((order) =>
    [
      order._id,
      order.appointment?.service,
      order.appointment?.barber,
      order.appointment?.name,
      String(order.appointment?.number),
      order.date,
      order.appointment?.startTime,
      String(order.appointment?.price),
      order.status,
    ].some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Send message to customers
  const sendMsg = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/admin/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ msg, image }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send messages");
        return;
      }

      await response.json();
      toast.success("Messages sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("A server or network error occurred while sending messages.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send message by selected date
  const sendMsgByDate = async () => {
    setIsLoading(true);
    try {
      const number = ordersDate.map((order) => `0${order.appointment.number}`);
      const response = await fetch(
        "https://luxe-barber-shop-backend.vercel.app/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msg, image, number }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.message ||
            "Failed to send messages due to server or network issue"
        );
        return;
      }

      await response.json();
      toast.success("Messages sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("A server or network issue occurred while sending messages.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch orders by date
  useEffect(() => {
    const getOrdersByDate = async () => {
      if (!fromDate || !toDate) return;

      try {
        const res = await fetch(
          `https://luxe-barber-shop-backend.vercel.app/admin/numbers-by-date/${fromDate}/${toDate}`
        );
        if (!res.ok) {
          console.log("Failed to fetch orders by date");
          return;
        }
        const numbersByDate = await res.json();
        setOrdersDate(numbersByDate);
      } catch (error) {
        console.error("Error fetching orders by date:", error);
      }
    };

    getOrdersByDate();
  }, [fromDate, toDate]);

  return (
    <>
      <Navbar />
      {showCustomer ? (
        <AddCustomer setShowCustomer={setShowCustomer} setOrders={setOrders} />
      ) : (
        <div className="dashboard-container">
          <h1>
            Dashboard for{" "}
            <span style={{ textTransform: "capitalize" }}>{user?.role}</span>
          </h1>
          <button className="btn btn-logout" onClick={logout}>
            Logout
          </button>
          {user && user?.role === "owner" ? (
            <>
              <div>
                <Link to="https://postimages.org/" target="_blank">
                  Go to this website, convert your image into a URL, and copy
                  the direct link
                </Link>
              </div>

              <div className="sendMsg">
                <div>
                  <input
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL of image (starting with https)"
                  />
                  <input
                    type="text"
                    placeholder="Announcement"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </div>
                {fromDate && toDate && ordersDate.length > 0 ? (
                  <button
                    className="btn"
                    disabled={isLoading}
                    onClick={sendMsgByDate}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                ) : (
                  <button
                    className="btn"
                    disabled={isLoading}
                    onClick={sendMsg}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                )}
              </div>
            </>
          ) : null}

          <div className="dashboard-feedback-btns">
            {user && user?.role === "owner" ? (
              <>
                <button className="btn" onClick={() => setShowFeedback(false)}>
                  Dashboard
                </button>
                <button className="btn" onClick={() => setShowFeedback(true)}>
                  Feedbacks
                </button>
              </>
            ) : null}
            <button className="btn" onClick={() => setCategory("Processing")}>
              Processing
            </button>
            {user && user?.role === "owner" ? (
              <>
                <button
                  className="btn"
                  onClick={() => setCategory("Completed")}
                >
                  Completed
                </button>
                <input
                  type="date"
                  className="btn"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                  type="date"
                  className="btn"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </>
            ) : null}
            <button className="btn" onClick={() => setShowCustomer(true)}>
              Add Customer
            </button>
          </div>

          {showFeedback ? (
            <FeedbackTable />
          ) : (
            <>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {fromDate && toDate && ordersDate.length > 0 ? (
                <OrderTable orders={ordersDate} setOrders={setOrders} />
              ) : fromDate && toDate && ordersDate.length === 0 ? (
                <h1>
                  No orders found for this date: {fromDate} - {toDate}
                </h1>
              ) : orders.length > 0 ? (
                <OrderTable orders={searchOrders} setOrders={setOrders} />
              ) : (
                <h1>Loading...</h1>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
