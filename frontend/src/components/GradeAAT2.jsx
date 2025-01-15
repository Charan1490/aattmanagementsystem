import React, { useState, useEffect } from "react";
import axios from "axios";

const GradeAAT2 = ({ aat2Id }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [aat2Id]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`/api/faculty/aat2/${aat2Id}/results`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudents(res.data);
    } catch (error) {
      setError("Failed to fetch students");
      console.error("Error fetching students:", error);
    }
  };

  const handleGradeChange = async (studentId, answers) => {
    try {
      await axios.post(
        "/api/faculty/aat2/grade",
        { aat2Id, studentId, answers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Grades updated successfully");
      fetchStudents();
    } catch (error) {
      setError("Failed to update grades");
      console.error("Error updating grades:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Grade AAT2</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Total Marks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId._id}>
              <td className="border p-2">{student.studentId.name}</td>
              <td className="border p-2">{student.studentId.email}</td>
              <td className="border p-2">{student.totalMarks}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleGradeChange(student.studentId._id, student.answers)}
                  className="p-1 bg-blue-500 text-white rounded"
                >
                  Grade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeAAT2;