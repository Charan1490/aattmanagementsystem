import React, { useState } from "react";
import axios from "axios";

const CreateAAT1 = () => {
  const [courseLink, setCourseLink] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/faculty/aat1",
        { courseLink, deadline },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("AAT1 created successfully");
      setCourseLink("");
      setDeadline("");
    } catch (error) {
      setError("Failed to create AAT1");
      console.error("Error creating AAT1:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create AAT1</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course Link"
          value={courseLink}
          onChange={(e) => setCourseLink(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create AAT1
        </button>
      </form>
    </div>
  );
};

export default CreateAAT1;