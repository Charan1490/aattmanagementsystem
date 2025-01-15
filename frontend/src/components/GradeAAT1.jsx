import React, { useState, useEffect } from "react";
import axios from "axios";

const GradeAAT1 = ({ aat1Id }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [aat1Id]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`/api/faculty/aat1/${aat1Id}/results`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudents(res.data);
    } catch (error) {
      setError("Failed to fetch students");
      console.error("Error fetching students:", error);
    }
  };

  const handleGradeChange = async (studentId, grade) => {
    try {
      await axios.post(
        "/api/faculty/aat1/grade",
        { aat1Id, studentId, grade },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Grade updated successfully");
      fetchStudents();
    } catch (error) {
      setError("Failed to update grade");
      console.error("Error updating grade:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Grade AAT1</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Grade</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId._id}>
              <td className="border p-2">{student.studentId.name}</td>
              <td className="border p-2">{student.studentId.email}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={student.grade}
                  onChange={(e) => handleGradeChange(student.studentId._id, e.target.value)}
                  className="p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleGradeChange(student.studentId._id, student.grade)}
                  className="p-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeAAT1;