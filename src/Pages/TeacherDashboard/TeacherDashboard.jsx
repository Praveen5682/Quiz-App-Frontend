// src/Pages/TeacherDashboard/TeacherDashboard.jsx
import React from "react";
import DashboardCard from "../../components/DashboardCard";
import {
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlinePlayCircle,
  AiOutlineTrophy,
} from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { GetQuiz } from "../../services/quiz/GetQuiz";
import { GetStudents } from "../../services/users/GetStudents";
import { GetGeneralLeaderboard } from "../../services/quiz/GetGeneralLeaderboard";

const TeacherDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes"],
    queryFn: GetQuiz,
  });

  const quizzes = data?.quizzes || [];

  const count = quizzes.length;

  const totalQuestions = quizzes.reduce(
    (sum, quiz) => sum + (quiz.questions?.length || 0),
    0
  );

  // Fetch Students

  const { data: studentsData } = useQuery({
    queryKey: ["students"],
    queryFn: GetStudents,
  });

  const students = studentsData?.students || [];

  console.log("❤️", students);

  const studentsCount = students.length;

  const { data: leaderboardData } = useQuery({
    queryKey: ["generalLeaderboard"],
    queryFn: GetGeneralLeaderboard,
  });

  const topStudent = leaderboardData?.leaderboard?.[0]?.fullname || "N/A";

  const stats = [
    {
      title: "Total Quizzes",
      value: count || 0,
      icon: <AiOutlineFileText size={24} />,
    },
    {
      title: "No Of Questions",
      value: totalQuestions || 0,
      icon: <AiOutlinePlayCircle size={24} />,
    },
    {
      title: "Total Students",
      value: studentsCount,
      icon: <AiOutlineUser size={24} />,
    },

    {
      title: "Top Students",
      value: topStudent, // Array of top 3 student names
      icon: <AiOutlineTrophy size={24} />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
