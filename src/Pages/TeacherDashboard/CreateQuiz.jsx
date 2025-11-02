import React, { useState } from "react";
import QuizModal from "../../components/QuizModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateQuestions } from "../../services/quiz/CreateQuiz";
import toast from "react-hot-toast";
import { GetQuiz } from "../../services/quiz/GetQuiz";
import { EditQuiz } from "../../services/quiz/EditQuiz";
import { DelQuiz } from "../../services/quiz/DelQuiz";

const CreateQuiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState(null); // track open quiz
  const [editQuizData, setEditQuizData] = useState(null);

  const queryClient = useQueryClient();

  // === 1. Create Quiz ===
  const createQuizMutation = useMutation({
    mutationFn: CreateQuestions,
    onSuccess: (data) => {
      toast.success(data.message || "Quiz created!");
      setQuizList([]);
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create quiz");
    },
  });

  // === 2. Fetch All Quizzes (with questions) ===
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes"],
    queryFn: GetQuiz,
  });

  const quizzes = data?.quizzes || [];

  // === 3. Add Question from Modal ===
  const handleAddQuestion = async (questionObj) => {
    if (questionObj.isEdit) {
      // Edit existing question
      updateQuestionMutation.mutate({
        quizid: questionObj.quizid,
        questionid: questionObj.questionid,
        question: questionObj.question,
        options: questionObj.options,
        correctIndex: questionObj.correctIndex,
      });
    } else {
      // Add new question (local, before creating quiz)
      setQuizList((prev) => [...prev, questionObj]);
    }
  };

  // === 4. Submit Quiz ===
  const handleSubmitQuiz = () => {
    if (!title.trim()) return toast.error("Quiz title is required");
    if (quizList.length === 0) return toast.error("Add at least one question");

    createQuizMutation.mutate({ title: title.trim(), questions: quizList });
  };

  // === 5. Toggle Quiz Expansion ===
  const toggleQuiz = (quizid) => {
    setExpandedQuiz((prev) => (prev === quizid ? null : quizid));
  };

  const updateQuestionMutation = useMutation({
    mutationFn: EditQuiz,
    onSuccess: (data) => {
      toast.success(data?.message || "Question updated successfully");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update question");
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: DelQuiz,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: () => {},
  });

  const handleDeleteQuestion = async (quizid, questionid) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await deleteQuizMutation.mutateAsync({ quizid, questionid });
      toast.success("Question deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    } catch (err) {
      toast.error(err.message || "Failed to delete question");
    }
  };

  const handleEditQuestion = (quizid, question) => {
    // Pass the full question data + quizid
    setEditQuizData({ ...question, quizid });
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* ====================== CREATE QUIZ SECTION ====================== */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-indigo-700">
          Create New Quiz
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title (e.g. Math Quiz 1)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Question
        </button>

        {/* Preview of added questions */}
        {quizList.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="font-medium text-sm text-gray-700">
              {quizList.length} question(s) added:
            </p>
            {quizList.map((q, i) => (
              <div
                key={i}
                className="text-sm p-2 bg-white rounded border-l-4 border-indigo-500"
              >
                <strong>Q{i + 1}:</strong> {q.question} →{" "}
                <span className="text-green-600 font-bold">
                  {q.options[q.correctIndex]}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmitQuiz}
          disabled={createQuizMutation.isPending}
          className="mt-5 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {createQuizMutation.isPending ? "Creating..." : "Create Quiz"}
        </button>
      </section>

      {/* ====================== QUIZZES TABLE ====================== */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-indigo-700">All Quizzes</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading quizzes...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load quizzes</p>
        ) : quizzes.length === 0 ? (
          <p className="text-center text-gray-500">No quizzes yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.map((quiz) => (
                  <React.Fragment key={quiz.quizid}>
                    {/* Main Row */}
                    <tr
                      className="hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => toggleQuiz(quiz.quizid)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quiz.quizid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {quiz.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {quiz.questions?.length || 0} question(s)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quiz.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <span className="text-indigo-600 hover:text-indigo-900">
                          {expandedQuiz === quiz.quizid ? "Collapse" : "Expand"}
                        </span>
                      </td>
                    </tr>

                    {/* Expanded Row: Questions */}
                    {expandedQuiz === quiz.quizid && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            {quiz.questions.map((q, i) => (
                              <div
                                key={q.questionid}
                                className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start"
                              >
                                <div>
                                  <p className="font-semibold text-lg mb-2">
                                    {q.question}
                                  </p>
                                  <ol className="list-decimal list-inside space-y-1">
                                    {q.options.map((opt, idx) => (
                                      <li
                                        key={idx}
                                        className={
                                          idx === q.correctIndex
                                            ? "font-bold text-green-600"
                                            : "text-gray-700"
                                        }
                                      >
                                        {opt}{" "}
                                        {idx === q.correctIndex && "← Correct"}
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                {/* Edit/Delete Buttons for this question */}
                                <div className="flex flex-col gap-2 ml-4">
                                  <button
                                    className="text-blue-600 hover:underline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditQuestion(quiz.quizid, q);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-600 hover:underline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteQuestion(
                                        quiz.quizid,
                                        q.questionid
                                      );
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ====================== MODAL ====================== */}
      <QuizModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditQuizData(null); // reset after closing
        }}
        onAdd={handleAddQuestion}
        editData={editQuizData}
      />
    </div>
  );
};

export default CreateQuiz;
