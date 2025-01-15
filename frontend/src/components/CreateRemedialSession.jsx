import React, { useState } from "react";
import axios from "axios";

const CreateRemedialSession = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [link, setLink] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/faculty/remedial-session",
        { title, description, startTime, endTime, duration, link, students },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Remedial session created successfully");
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setDuration("");
      setLink("");
      setStudents([]);
    } catch (error) {
      setError("Failed to create remedial session");
      console.error("Error creating remedial session:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create Remedial Session</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Session Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {/* Add student selection input here */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Remedial Session
        </button>
      </form>
    </div>
  );
};

export default CreateRemedialSession;