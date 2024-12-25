

import React, { useState, useEffect } from "react";
import "./../styles/Feedback.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {

  const [feedback, setFeedback] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [feedbackId, setFeedbackId] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

   useEffect(() => {
    if(!localStorage.getItem("apiKey")){
      navigate('/');
    }
   })

  
  const fetchFeedbacks = async () => {
    navigate("/dashboard");
    
  };

  

  
  const handleSubmit = async () => {
    if (!feedback) {
      setError("Feedback cannot be empty!");
      return;
    }

   
    let sanitizedFeedback = feedback.trim();
    sanitizedFeedback = sanitizedFeedback.replace(/,+/g, ' ');
    sanitizedFeedback = sanitizedFeedback.replace(/\s+/g, ' '); 

    if (!sanitizedFeedback) {
      setError("Feedback cannot be empty after cleaning!");
      return;
    }

    setLoading(true); // Show loading state while submitting

    try {
      const apiKey = localStorage.getItem("apiKey"); 
      if (!apiKey) {
        setError("You must be logged in to submit feedback!");
        setLoading(false);
        return;
      }

      const url = isEditing && feedbackId
        ? "http://localhost:8080/api/feedback/${feedbackId}" 
        : "http://localhost:8080/api/feedback"; 

      const method = isEditing && feedbackId ? "put" : "post"; 

   
      await axios({
        method,
        url,
        data: {content:sanitizedFeedback},
        headers: {
          "x-api-key": apiKey,
        },
      });

      

      setFeedback("");
      setIsEditing(false); 
      setFeedbackId(null); 
      setLoading(false);

      if (!isEditing) {
        fetchFeedbacks();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (isEditing) fetchFeedbacks();
  }, [isEditing]);

  return (
    <div className="feedback-container">
      <h2>Add Feedback</h2>

      <div className="buttons">
        {/* <button onClick={handleAddFeedback}>Add Feedback</button> */}
        <button onClick={fetchFeedbacks}>View the Feedback List</button>
      </div>

     
      {error && <div className="error-message">{error}</div>}

      
      {/* {!isEditing && ( */}
        <>
          <h3>Write New Feedback</h3>
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={loading} 
          ></textarea>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </>
      {/* )} */}

     
    </div>
  );
};

export default Feedback;