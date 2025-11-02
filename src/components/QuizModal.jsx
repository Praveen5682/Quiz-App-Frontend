// src/components/QuizModal.jsx
import React, { useState, useEffect } from "react";

const QuizModal = ({ isOpen, onClose, onAdd, editData }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  // ---- Fill form when editing or reset when closed ----
  useEffect(() => {
    if (editData) {
      setQuestion(editData.question ?? "");
      setOptions(editData.options ?? ["", "", "", ""]);
      setCorrectIndex(editData.correctIndex ?? 0);
    } else if (!isOpen) {
      // modal closed → reset
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
    }
  }, [isOpen, editData]);

  const handleOptionChange = (idx, val) => {
    const copy = [...options];
    copy[idx] = val;
    setOptions(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || options.some((o) => !o.trim())) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      question: question.trim(),
      options: options.map((o) => o.trim()),
      correctIndex,
    };

    if (editData?.questionid) {
      // ---- EDIT ----
      onAdd({
        ...payload,
        quizid: editData.quizid,
        questionid: editData.questionid,
        isEdit: true,
      });
    } else {
      // ---- ADD ----
      onAdd(payload);
    }

    onClose();
  };

  if (!isOpen) return null;

  const isEdit = !!editData?.questionid;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Question" : "Add New Question"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-medium block">Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter question"
            />
          </div>

          {options.map((opt, i) => (
            <div key={i}>
              <label className="font-medium block">Option {i + 1}:</label>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                className="w-full mt-1 p-2 border rounded"
                placeholder={`Option ${i + 1}`}
              />
            </div>
          ))}

          <div>
            <label className="font-medium block">Correct Answer:</label>
            <select
              value={correctIndex}
              onChange={(e) => setCorrectIndex(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            >
              {options.map((_, i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isEdit ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizModal;
