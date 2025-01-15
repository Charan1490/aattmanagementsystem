import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("aat1");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="flex space-x-4">
          <Link
            to="/faculty/aat1"
            className={`text-white px-4 py-2 rounded ${activeTab === "aat1" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("aat1")}
          >
            Create AAT1
          </Link>
          <Link
            to="/faculty/aat2"
            className={`text-white px-4 py-2 rounded ${activeTab === "aat2" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("aat2")}
          >
            Create AAT2
          </Link>
          <Link
            to="/faculty/remedial-session"
            className={`text-white px-4 py-2 rounded ${activeTab === "remedial-session" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("remedial-session")}
          >
            Create Remedial Session
          </Link>
          <Link
            to="/faculty/students"
            className={`text-white px-4 py-2 rounded ${activeTab === "students" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            View Students
          </Link>
        </div>
      </nav>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default FacultyDashboard;