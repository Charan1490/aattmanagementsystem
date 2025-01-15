import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("aat1");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="flex space-x-4">
          <Link
            to="/student/aat1"
            className={`text-white px-4 py-2 rounded ${activeTab === "aat1" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("aat1")}
          >
            AAT1
          </Link>
          <Link
            to="/student/aat2"
            className={`text-white px-4 py-2 rounded ${activeTab === "aat2" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("aat2")}
          >
            AAT2
          </Link>
          <Link
            to="/student/remedial-sessions"
            className={`text-white px-4 py-2 rounded ${activeTab === "remedial-sessions" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("remedial-sessions")}
          >
            Remedial Sessions
          </Link>
          <Link
            to="/student/statistics"
            className={`text-white px-4 py-2 rounded ${activeTab === "statistics" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("statistics")}
          >
            Statistics
          </Link>
        </div>
      </nav>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;