import React, { useState } from "react";
import axios from "axios";

const CreateAAT2 = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      {
        type,
        question: "",
        options: type === "mcq" ? [] : null,
        correctAnswer: type === "subjective" ? null : "",
        marks: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/faculty/aat2",
        { title, questions, startTime, endTime, duration },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("AAT2 created successfully");
      setTitle("");
      setQuestions([]);
      setStartTime("");
      setEndTime("");
      setDuration("");
    } catch (error) {
      setError("Failed to create AAT2");
      console.error("Error creating AAT2:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create AAT2</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Add questions */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Questions</h3>
          <button
            type="button"
            onClick={() => addQuestion("mcq")}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Add MCQ
          </button>
          <button
            type="button"
            onClick={() => addQuestion("fillInTheBlanks")}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Add Fill in the Blanks
          </button>
          <button
            type="button"
            onClick={() => addQuestion("subjective")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Subjective
          </button>

          {questions.map((question, index) => (
            <div key={index} className="mt-4 p-4 border rounded">
              <input
                type="text"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              {question.type === "mcq" && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Options</h4>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...question.options];
                          updatedOptions[optionIndex] = e.target.value;
                          handleQuestionChange(index, "options", updatedOptions);
                        }}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
                          handleQuestionChange(index, "options", updatedOptions);
                        }}
                        className="ml-2 bg-red-500 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedOptions = [...question.options, ""];
                      handleQuestionChange(index, "options", updatedOptions);
                    }}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Add Option
                  </button>
                </div>
              )}
              {question.type !== "subjective" && (
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
              )}
              <input
                type="number"
                placeholder="Marks"
                value={question.marks}
                onChange={(e) => handleQuestionChange(index, "marks", e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updatedQuestions = questions.filter((_, i) => i !== index);
                  setQuestions(updatedQuestions);
                }}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove Question
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create AAT2
        </button>
      </form>
    </div>
  );
};

export default CreateAAT2;