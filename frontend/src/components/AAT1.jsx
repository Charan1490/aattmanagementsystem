import React, { useState, useEffect } from "react";
import axios from "axios";

const AAT1 = () => {
  const [aat1, setAAT1] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAAT1();
  }, []);

  const fetchAAT1 = async () => {
    try {
      const res = await axios.get("/api/student/aat1", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAAT1(res.data);
    } catch (error) {
      setError("Failed to fetch AAT1");
      console.error("Error fetching AAT1:", error);
    }
  };

  const handleUpload = async (aat1Id) => {
    try {
      await axios.post(
        "/api/student/aat1/upload",
        { aat1Id, certificate },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Certificate uploaded successfully");
      setCertificate("");
      fetchAAT1();
    } catch (error) {
      setError("Failed to upload certificate");
      console.error("Error uploading certificate:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">AAT1</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {aat1.map((aat) => (
          <div key={aat._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{aat.courseLink}</h3>
            <p>Deadline: {new Date(aat.deadline).toLocaleString()}</p>
            {aat.submitted ? (
              <p>Grade: {aat.grade}</p>
            ) : (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Certificate URL"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <button
                  onClick={() => handleUpload(aat._id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Upload Certificate
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AAT1;