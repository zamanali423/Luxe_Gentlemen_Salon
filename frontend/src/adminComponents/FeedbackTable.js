import React, { useEffect, useState } from "react";
import "../css/feedbackTable.css";
import toast from "react-hot-toast";

const FeedbackTable = () => {
  const [feedbacks, setfeedbacks] = useState([]);
  useEffect(() => {
    const fetchAllFeedbacks = async () => {
      try {
        const res = await fetch(
          "https://luxe-barber-shop-backend.vercel.app/reviews"
        );
        if (!res.ok) {
          toast.error("Some error of server or your network");
        }
        const data = await res.json();
        setfeedbacks(data);
        console.log("reviews", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllFeedbacks();
  }, []);

  //! delete feedback
  const deleteFeedback = async (feedback) => {
    try {
      const res = await fetch(
        `https://luxe-barber-shop-backend.vercel.app/admin/delete-review/${feedback._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        toast.error("Some error of server or your network");
      }
      const updateFeedback = await res.json();
      setfeedbacks((prevFeedback) =>
        prevFeedback.filter((review) => review._id !== updateFeedback._id)
      );
      toast.success("Feedback Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="feedback-table-container">
      <h2 className="feedback-table-title">User Feedback</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                Loading...
              </td>
            </tr>
          ) : (
            feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.userName}</td>
                <td>{feedback.number}</td>
                <td>{feedback.comment}</td>
                <td>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa fa-star ${
                        i < feedback.rating ? "fa-ragular" : "fa-solid"
                      }`}
                    ></i>
                  ))}
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteFeedback(feedback)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
