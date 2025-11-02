import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import { AuthContext } from "../contexts/AuthContext";

const StudentLayout = () => {
  const { userId } = useContext(AuthContext); // or fetch username if available
  const location = useLocation();
  const showWelcomeBanner = location.pathname === "/dashboard/student";

  const userName = localStorage.getItem("fullname");
  const roleid = parseInt(localStorage.getItem("roleid"), 10);

  // Replace with actual username fetch if you store it somewhere

  return (
    <div className="flex">
      <StudentSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        {showWelcomeBanner && <WelcomeBanner name={userName} roleid={roleid} />}
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
