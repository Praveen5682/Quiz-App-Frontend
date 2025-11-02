import React from "react";
import DashboardCard from "../../components/DashboardCard";
import {
  AiOutlineFileText,
  AiOutlinePlayCircle,
  AiOutlineTrophy,
} from "react-icons/ai";
import { GetQuiz } from "../../services/quiz/GetQuiz";
import { useQuery } from "@tanstack/react-query";
import { GetGeneralLeaderboard } from "../../services/quiz/GetGeneralLeaderboard";

const StudentDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes"],
    queryFn: GetQuiz,
  });

  const quizzes = data?.quizzes || [];

  const totalQuestions = quizzes.reduce(
    (sum, quiz) => sum + (quiz.questions?.length || 0),
    0
  );

  const { data: leaderboardData } = useQuery({
    queryKey: ["generalLeaderboard"],
    queryFn: GetGeneralLeaderboard,
  });

  const topStudent = leaderboardData?.leaderboard?.[0]?.fullname || "N/A";

  const stats = [
    {
      title: "Available Quizzes",
      value: totalQuestions,
      icon: <AiOutlineFileText size={24} />,
    },

    {
      title: "Top Students",
      value: topStudent,
      icon: <AiOutlineTrophy size={24} />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={
              Array.isArray(item.value) ? item.value.join(", ") : item.value
            }
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
