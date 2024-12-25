import React, { useState, useEffect } from "react";
import "./../styles/UserList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const apiKey = localStorage.getItem("apiKey");
     
      if (!apiKey) {
        setError("You must be logged in to view the user list!");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/api/users", {
        headers: {
          "x-api-key": apiKey,
        },
      });

      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
          setError("You must be logged in to perform this action!");
          return;
        }

        await axios.delete(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            "x-api-key": apiKey,
          },
        });

        setUsers((prev) => prev.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  // Navigate to edit user page
  const handleEdit = (user) => {
    navigate("/edituser", { state: { user } });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Username</th>
              <th>Email</th>
              <th>Feedback Count</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {/* <td>{user.id}</td> */}
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.feedbackCount}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default UserList;
