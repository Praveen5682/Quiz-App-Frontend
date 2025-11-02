import React from "react";
import studentImage from "../assets/images/student.jpg";
import teacherImage from "../assets/images/teacher.jpg";

const WelcomeBanner = ({ name = "User", roleid }) => {
  const isTeacher = roleid === 1;

  const messages = {
    teacher: [
      "Create engaging quizzes and inspire your students to learn better.",
      "Track progress, manage questions, and shape young minds with knowledge.",
    ],
    student: [
      "Ready to test your knowledge? Let’s start a new quiz!",
      "Learn, challenge yourself, and climb the leaderboard!",
    ],
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 mb-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left section */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="capitalize">{name} 👋</span>
          </h1>
          <p className="text-sm md:text-base mt-2 opacity-90">
            {isTeacher ? messages.teacher[0] : messages.student[0]}
          </p>
          <p className="text-xs md:text-sm mt-1 opacity-75">
            {isTeacher ? messages.teacher[1] : messages.student[1]}
          </p>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={isTeacher ? teacherImage : studentImage}
            alt={isTeacher ? "Teacher" : "Student"}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white/40 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
