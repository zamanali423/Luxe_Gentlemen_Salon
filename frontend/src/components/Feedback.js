import React, { useState } from "react";
import "../css/feedback.css";
import toast from "react-hot-toast";

const Feedback = () => {
  const [isLoading, setisLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    userName: "",
    number: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle the star click
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await fetch("https://luxe-barber-shop-backend.vercel.app/reviews/new-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rating }),
      });
      if (!res.ok) {
        toast.error(
          "Feedback cannot given due to some server or your network issues"
        );
        setisLoading(false);
        return;
      }
      const feedback = await res.json();
      console.log(feedback);
      toast.success("Feedback submitted successfully!");
      setisLoading(false);
      // Reset form fields
      setFormData({
        userName: "",
        number: "",
        comment: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Server error");
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">We Value Your Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name <span>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">
            Number <span>*</span>
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            required
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Enter your feedback"
          />
        </div>
        <div>
          <label htmlFor="rating" style={{ color: "white", float: "left" }}>
            Give your rating
          </label>
          {[...Array(5)].map((star, index) => {
            const starValue = index + 1;
            return (
              <i
                key={starValue}
                className={`fa fa-star ${
                  starValue <= rating ? "fa-ragular" : "fa-solid"
                }`}
                onClick={() => handleRating(starValue)}
                style={{ cursor: "pointer" }} // Make the stars clickable
              ></i>
            );
          })}
        </div>
        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
