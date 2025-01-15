import React from "react";
import { useLocation } from "react-router-dom";
import SuperadminDashboard from "../components/SuperadminDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";

const Dashboard = () => {
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role");

  return (
    <div>
      {role === "superadmin" && <SuperadminDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === "faculty" && <div>Faculty Dashboard</div>}
      {role === "student" && <div>Student Dashboard</div>}
    </div>
  );
};

export default Dashboard;