import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/ViewFeedback.css";

const ViewFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state || {};

    useEffect(() => {
      if(!localStorage.getItem("apiKey")){
        navigate('/');
      }
})

  if (!feedback) {
    return (
      <div className="view-feedback">
        <h2>Feedback Not Found</h2>
        <button onClick={() => navigate("/admin")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="view-feedback">
      <h2>Feedback Details</h2>
      <div className="feedback-details">
        <p><strong>ID:</strong> {feedback.id}</p>
        <p><strong>Content:</strong> {feedback.content}</p>
      </div>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default ViewFeedback;
