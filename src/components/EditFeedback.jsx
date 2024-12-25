import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/EditFeedback.css";

const EditFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state || {};
  const [newContent, setNewContent] = useState(feedback?.content || "");

  const handleSave = async () => {
    if (!newContent) {
      alert("Feedback content cannot be empty.");
      return;
    }

    try {
      const apiKey = localStorage.getItem("apiKey");
      if (!apiKey) {
        console.warn("You must be logged in to edit feedback!");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/feedback/${feedback.id}`,
        { content: newContent },
        {
          headers: { "x-api-key": apiKey },
        }
      );

      alert("Feedback updated successfully!");
      navigate("/dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect back to Admin Dashboard
  };

  return (
    <div className="edit-feedback">
      <h2>Edit Feedback</h2>
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Edit your feedback here"
      />
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditFeedback;
