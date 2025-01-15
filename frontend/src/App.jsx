import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import SuperadminDashboard from "./components/SuperadminDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import FacultyDashboard from "./components/FacultyDashboard.jsx";
import CreateAAT1 from "./components/CreateAAT1.jsx";
import CreateAAT2 from "./components/CreateAAT2.jsx";
import CreateRemedialSession from "./components/CreateRemedialSession.jsx";
import ViewStudents from "./components/ViewStudents.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import AAT1 from "./components/AAT1.jsx";
import AAT2 from "./components/AAT2.jsx";
import RemedialSessions from "./components/RemedialSessions.jsx";
import Statistics from "./components/Statistics.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Superadmin routes */}
        <Route path="/superadmin" element={<SuperadminDashboard />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Faculty dashboard and nested routes */}
        <Route path="/faculty" element={<FacultyDashboard />}>
          <Route path="aat1" element={<CreateAAT1 />} />
          <Route path="aat2" element={<CreateAAT2 />} />
          <Route path="remedial-session" element={<CreateRemedialSession />} />
          <Route path="students" element={<ViewStudents />} />
        </Route>

        {/* Student dashboard and nested routes */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route path="aat1" element={<AAT1 />} />
          <Route path="aat2" element={<AAT2 />} />
          <Route path="remedial-sessions" element={<RemedialSessions />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>

        {/* Fallback route for invalid paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;