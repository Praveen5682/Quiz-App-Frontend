import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import { AuthContext } from "../contexts/AuthContext";

const TeacherLayout = () => {
  const { userId } = useContext(AuthContext); // or fetch username if available
  const location = useLocation();
  const showWelcomeBanner = location.pathname === "/dashboard/teacher";

  const userName = localStorage.getItem("fullname");
  const roleid = parseInt(localStorage.getItem("roleid"), 10);

  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        {showWelcomeBanner && <WelcomeBanner name={userName} roleid={roleid} />}
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
