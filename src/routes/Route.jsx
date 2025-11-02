// src/routes/Route.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherDashboard from "../Pages/TeacherDashboard/TeacherDashboard";
import CreateQuiz from "../Pages/TeacherDashboard/CreateQuiz";
import StudentDashboard from "../Pages/StudentDashboard/StudentDashboard";
import StudentLayout from "../layouts/StudentLayout";
import TakeQuiz from "../Pages/StudentDashboard/TakeQuiz";
import MyResults from "../Pages/StudentDashboard/MyResults";
import StudentsPage from "../Pages/TeacherDashboard/StudentsPage";
import StudentLeaderBoard from "../Pages/StudentDashboard/StudentLeaderBoard";
import TeacherLeaderBoard from "../Pages/TeacherDashboard/TeacherLeaderBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "teacher",
        element: <TeacherLayout />, // wraps all teacher pages
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: "create-quiz", element: <CreateQuiz /> },
          { path: "students", element: <StudentsPage /> },
          { path: "leaderboard", element: <TeacherLeaderBoard /> },
        ],
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { index: true, element: <StudentDashboard /> }, // dashboard/home
          { path: "quizzes", element: <TakeQuiz /> }, // take quizzes
          { path: "leaderboard", element: <StudentLeaderBoard /> },
          { path: "results", element: <MyResults /> }, // optional results page
        ],
      },
    ],
  },
]);

export default router;
