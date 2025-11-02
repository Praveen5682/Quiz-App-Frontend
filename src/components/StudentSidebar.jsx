import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineTrophy,
  AiOutlineLogout,
} from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-6 text-xl font-bold text-gray-800">Student Panel</div>
      <nav className="mt-6 flex flex-col gap-1">
        <NavLink
          to="/dashboard/student"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <AiOutlineDashboard className="mr-3" /> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/student/quizzes"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <AiOutlineFileText className="mr-3" /> Take Quiz
        </NavLink>

        <NavLink
          to="/dashboard/student/results"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <AiOutlineFileText className="mr-3" /> My Results
        </NavLink>

        <NavLink
          to="/dashboard/student/leaderboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <AiOutlineTrophy className="mr-3" /> Leaderboard
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 mt-4 w-full text-left hover:bg-red-600 hover:text-white"
        >
          <AiOutlineLogout className="mr-3" /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
