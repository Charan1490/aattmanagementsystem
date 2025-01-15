import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [statistics, setStatistics] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await axios.get("/api/student/statistics", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStatistics(res.data);
    } catch (error) {
      setError("Failed to fetch statistics");
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded shadow-md">
        <p>AAT1 Submitted: {statistics.aat1Submitted}</p>
        <p>AAT2 Submitted: {statistics.aat2Submitted}</p>
        <p>Sessions Attended: {statistics.sessionsAttended}</p>
        <p>AAT1 Grades: {statistics.aat1Grades?.join(", ")}</p>
        <p>AAT2 Marks: {statistics.aat2Marks?.join(", ")}</p>
      </div>
    </div>
  );
};

export default Statistics;