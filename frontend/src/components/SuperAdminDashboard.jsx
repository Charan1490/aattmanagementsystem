import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperadminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/superadmin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };

  const handleWhitelistEmail = async () => {
    try {
      await axios.post(
        "/api/superadmin/whitelist",
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Email whitelisted successfully");
      setEmail("");
    } catch (error) {
      setError("Failed to whitelist email");
      console.error("Error whitelisting email:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Superadmin Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <input
          type="email"
          placeholder="Enter email to whitelist"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleWhitelistEmail} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Whitelist Email
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button className="p-1 bg-yellow-500 text-white rounded">Edit</button>
                <button className="p-1 bg-red-500 text-white rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperadminDashboard;