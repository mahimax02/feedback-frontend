import React, { useState, useEffect } from "react";
import "./../styles/AdminDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  // Fetch feedback data from the backend
  useEffect(() => {
    if(!localStorage.getItem("apiKey")){
      navigate('/');
    }
    const fetchFeedback = async () => {

      try {
        const apiKey = localStorage.getItem("apiKey");
        const isAdminValue = localStorage.getItem("isAdmin"); 
        setIsAdmin(isAdminValue === "true"); 

        if (!apiKey) {
          console.warn("You must be logged in to view feedback!");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/feedback", {
          headers: { "x-api-key": apiKey },
        });

        setFeedbackList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        alert("Failed to fetch feedback.");
      }
    };

    fetchFeedback();
  }, []);


  const handleView = (feedback) => {
    navigate("/viewfeedback", { state: { feedback } });
  };

 
  const handleEdit = async (feedback) => {
    navigate("/editfeedback", { state: { feedback } });
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
          console.warn("You must be logged in to delete feedback!");
          return;
        }

        await axios.delete(`http://localhost:8080/api/feedback?feedbackId=${id}`, {
          headers: { "x-api-key": apiKey },
        });

        setFeedbackList((prev) => prev.filter((item) => item.id !== id));
        alert("Feedback deleted successfully!");
      } catch (error) {
        console.error("Error deleting feedback:", error);
        alert("Failed to delete feedback.");
      }
    }
  };


  const handleLogout = async () => {
    try {
        
        localStorage.removeItem("apiKey");
        localStorage.removeItem("isAdmin");

       
        await axios.post(
            "http://localhost:8080/api/logout",
            new URLSearchParams({
                username: localStorage.getItem("username")
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        
        alert("Logged out successfully!");

        
        navigate("/");
    } catch (error) {
        console.error("Error during logout:", error);
        alert("Logout failed. Please try again.");
    }
};

  return (
    <div className="admin-dashboard">
      {isAdmin ? <h2>Admin Feedback Dashboard</h2>:<h2>User Feedback Dashboard</h2>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {isAdmin && <th>Username</th>} 
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {isAdmin && <td>{item.username}</td>} 
              <td>{item.content}</td>
              <td>
                <button onClick={() => handleView(item)}>View</button>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {!isAdmin && <button onClick={() => navigate('/feedback')}>Add Feedback</button>}
      <button className="logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default AdminDashboard;