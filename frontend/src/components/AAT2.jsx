import React, { useState, useEffect } from "react";
import axios from "axios";

const AAT2 = () => {
  const [aat2, setAAT2] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAAT2();
  }, []);

  const fetchAAT2 = async () => {
    try {
      const res = await axios.get("/api/student/aat2", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAAT2(res.data);
    } catch (error) {
      setError("Failed to fetch AAT2");
      console.error("Error fetching AAT2:", error);
    }
  };

  const handleSubmit = async (aat2Id) => {
    try {
      const res = await axios.post(
        "/api/student/aat2/submit",
        { aat2Id, answers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`AAT2 submitted successfully. Marks Obtained: ${res.data.marksObtained}`);
      setAnswers([]);
      fetchAAT2();
    } catch (error) {
      setError("Failed to submit AAT2");
      console.error("Error submitting AAT2:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">AAT2</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {aat2.map((aat) => (
          <div key={aat._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{aat.title}</h3>
            <p>Start Time: {new Date(aat.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(aat.endTime).toLocaleString()}</p>
            {aat.submitted ? (
              <p>Marks Obtained: {aat.marksObtained}</p>
            ) : (
              <div className="mt-4">
                {aat.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p>{question.question}</p>
                    {question.type === "mcq" && (
                      <div>
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="block">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              onChange={(e) => {
                                const updatedAnswers = [...answers];
                                updatedAnswers[index] = e.target.value;
                                setAnswers(updatedAnswers);
                              }}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                    {question.type === "fillInTheBlanks" && (
                      <input
                        type="text"
                        placeholder="Your answer"
                        value={answers[index] || ""}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                        className="w-full p-2 border rounded"
                      />
                    )}
                    {question.type === "subjective" && (
                      <textarea
                        placeholder="Your answer"
                        value={answers[index] || ""}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                        className="w-full p-2 border rounded"
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleSubmit(aat._id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit AAT2
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AAT2;