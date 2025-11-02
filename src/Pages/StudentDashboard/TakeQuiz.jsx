// src/components/TakeQuiz.js
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetQuiz } from "../../services/quiz/GetQuiz";
import { SubmitQuiz } from "../../services/quiz/SubmitQuiz";
import toast from "react-hot-toast";

const TakeQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // -----------------------------------------------------------------
  // 1. FETCH QUIZZES
  // -----------------------------------------------------------------
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes"],
    queryFn: GetQuiz,
  });

  const quizzes = data?.quizzes || [];
  const userid = localStorage.getItem("userid")
    ? Number(localStorage.getItem("userid"))
    : null;
  // -----------------------------------------------------------------
  // 2. ANSWERS STATE
  // -----------------------------------------------------------------
  const [answers, setAnswers] = useState({});

  // -----------------------------------------------------------------
  // 3. SUBMIT ALL MUTATION
  // -----------------------------------------------------------------
  const submitAllMutation = useMutation({
    mutationFn: async (payloads) => {
      const results = await Promise.all(payloads.map((p) => SubmitQuiz(p)));
      return results;
    },
    onSuccess: (results) => {
      let totalScore = 0;
      let totalQuestions = 0;

      results.forEach((res, i) => {
        totalScore += res.score;
        totalQuestions += quizzes[i].questions.length;
      });

      // ONE TOAST ONLY
      toast.success(
        `All quizzes submitted! Score: ${totalScore}/${totalQuestions}`
      );

      // NAVIGATE TO RESULTS
      navigate("/dashboard/student/results");
    },
    onError: (err) => {
      toast.error(
        `Submission failed: ${err?.response?.data?.message || err.message}`
      );
    },
  });

  // -----------------------------------------------------------------
  // 4. HANDLERS
  // -----------------------------------------------------------------
  const handleSelect = (quizId, questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: {
        ...(prev[quizId] || {}),
        [questionId]: optionIndex,
      },
    }));
  };

  const handleSubmitAll = () => {
    const payloads = quizzes
      .map((quiz) => {
        const quizAnswers = answers[quiz.quizid] || {};

        if (Object.keys(quizAnswers).length < quiz.questions.length) {
          if (
            !window.confirm(
              `"${quiz.title}" has unanswered questions. Submit anyway?`
            )
          ) {
            return null; // skip this quiz
          }
        }

        return {
          userid,
          quizid: quiz.quizid,
          answers: quizAnswers,
        };
      })
      .filter(Boolean); // removes nulls

    if (payloads.some((p) => p === null)) return;

    submitAllMutation.mutate(payloads);
  };

  // -----------------------------------------------------------------
  // 5. RENDER
  // -----------------------------------------------------------------
  if (isLoading) return <p className="text-center">Loading quizzes...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load quizzes.</p>;
  if (!quizzes.length)
    return <p className="text-center">No quizzes available.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Take All Quizzes</h2>

      {quizzes.map((quiz) => {
        const quizAnswers = answers[quiz.quizid] || {};

        return (
          <div
            key={quiz.quizid}
            className="mb-8 p-6 bg-gray-50 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4">{quiz.title}</h3>

            {quiz.questions.map((q, idx) => (
              <div
                key={q.questionid}
                className="mb-5 p-4 bg-white rounded shadow-sm"
              >
                <p className="font-medium">
                  {idx + 1}. {q.question}
                </p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`q-${q.questionid}`}
                          checked={quizAnswers[q.questionid] === i}
                          onChange={() =>
                            handleSelect(quiz.quizid, q.questionid, i)
                          }
                          className="form-radio"
                        />
                        <span>{opt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}

      <button
        onClick={handleSubmitAll}
        disabled={submitAllMutation.isPending}
        className={`w-full py-3 rounded font-bold text-white transition ${
          submitAllMutation.isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitAllMutation.isPending ? "Submitting..." : "Submit All Quizzes"}
      </button>
    </div>
  );
};

export default TakeQuiz;
