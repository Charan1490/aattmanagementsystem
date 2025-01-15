import React, { useState, useEffect } from "react";
import axios from "axios";

const RemedialSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("/api/student/remedial-sessions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSessions(res.data);
    } catch (error) {
      setError("Failed to fetch remedial sessions");
      console.error("Error fetching remedial sessions:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Remedial Sessions</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{session.title}</h3>
            <p>{session.description}</p>
            <p>Start Time: {new Date(session.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(session.endTime).toLocaleString()}</p>
            <p>Duration: {session.duration} minutes</p>
            <a href={session.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Join Session
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemedialSessions;