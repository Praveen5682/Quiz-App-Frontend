// src/pages/dashboard/student/MyResults.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetMyResults } from "../../services/quiz/GetMyResults";

const MyResults = () => {
  const userid = localStorage.getItem("userid")
    ? Number(localStorage.getItem("userid"))
    : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["results", userid],
    queryFn: () => GetMyResults(userid),
  });

  const [expandedQuiz, setExpandedQuiz] = useState(null);

  if (isLoading) return <p className="text-center mt-8">Loading results...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">Error loading results.</p>
    );

  const results = data?.results || [];

  const toggleQuiz = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-500">You have not taken any quizzes yet.</p>
      ) : (
        <div className="space-y-4">
          {results
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((res) => (
              <div key={res.attemptId} className="p-4 bg-white rounded shadow">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuiz(res.attemptId)}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{res.quizTitle}</h3>
                    <p>
                      Score: <strong>{res.score}</strong> / {res.total}
                    </p>
                    <p>Date: {new Date(res.date).toLocaleDateString()}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full font-semibold ${
                      parseFloat(res.percentage) >= 50
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {res.percentage}%
                  </div>
                </div>

                {expandedQuiz === res.attemptId && (
                  <div className="mt-4 border-t pt-2 space-y-2">
                    {res.questions.map((q, i) => (
                      <div
                        key={i}
                        className="p-2 bg-gray-50 rounded flex flex-col"
                      >
                        <p className="font-medium">
                          Q{i + 1}: {q.question}
                        </p>
                        <p>
                          Your answer:{" "}
                          <span
                            className={`font-semibold ${
                              q.isCorrect ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {q.selectedIndex !== null
                              ? q.selectedIndex
                              : "No answer"}
                          </span>
                        </p>
                        <p>Correct answer: {q.correctIndex}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyResults;
