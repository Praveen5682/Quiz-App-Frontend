import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlinePlusCircle,
  AiOutlineDatabase,
  AiOutlineBarChart,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";

const TeacherSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen p-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <div
          className="flex justify-end mb-6 m-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu size={24} />
        </div>

        {/* Logo */}
        <div className="mb-8 text-center font-bold text-lg">
          {isOpen ? "Quiz App" : "QA"}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/teacher"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <AiOutlineDashboard size={20} />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/dashboard/teacher/create-quiz"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <AiOutlinePlusCircle size={20} />
            {isOpen && <span>Create Quiz</span>}
          </NavLink>

          <NavLink
            to="/dashboard/teacher/students"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <AiOutlinePlusCircle size={20} />
            {isOpen && <span>Students</span>}
          </NavLink>

          <NavLink
            to="/dashboard/teacher/leaderboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <AiOutlineBarChart size={20} />
            {isOpen && <span>Leaderboard</span>}
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 mt-auto rounded hover:bg-red-700 w-full text-left"
          >
            <AiOutlineLogout size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100"></div>
    </div>
  );
};

export default TeacherSidebar;
