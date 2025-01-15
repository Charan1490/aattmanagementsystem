import React from "react";
import { Link } from "react-router-dom";

const FacultyNavbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/faculty" className="text-white text-xl font-bold">
          Faculty Dashboard
        </Link>
        <div className="space-x-4">
          <Link to="/faculty/create-aat1" className="text-white hover:text-gray-200">
            Create AAT1
          </Link>
          <Link to="/faculty/create-aat2" className="text-white hover:text-gray-200">
            Create AAT2
          </Link>
          <Link to="/faculty/create-remedial-session" className="text-white hover:text-gray-200">
            Create Remedial Session
          </Link>
          <Link to="/faculty/students" className="text-white hover:text-gray-200">
            View Students
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default FacultyNavbar;