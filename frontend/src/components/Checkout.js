import React, { useState } from "react";
import "../css/checkout.css";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Checkout = () => {
  const [isLoading, setisLoading] = useState(false);
  const [selection, setSelection] = useState("Cash on Delivery");
  const navigate = useNavigate();

  const location = useLocation();
  const { order, service } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      toast.success("Order placed successfully");
      setisLoading(false);

      navigate("/orders/order-detail", { state: { order } });
    } catch (error) {
      console.error("Error placing order:", error);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
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

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Information</h2>
          <div className="form-group">
            <label htmlFor="payment">Payment Method</label>
            <select
              name="payment"
              id="payment"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
              required
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button type="submit" className="btn-checkout">
            {isLoading ? "Purchasing..." : "Complete Purchase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
