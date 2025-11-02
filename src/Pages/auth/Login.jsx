import React, { useState, useContext } from "react";
import bgVideo from "../../assets/videos/bg.mp4";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth/login";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const LoginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("data", data);

      if (data.status) {
        // Decode role from JWT
        let role = null;
        try {
          const decoded = jwtDecode(data.token);
          role = decoded.role; // "teacher" or "student"
        } catch (err) {
          toast.error("Invalid token");
          return;
        }

        // Save to AuthContext
        contextLogin(data);

        toast.success(data.message || "Login successful!");

        // Now use decoded role
        navigate(
          role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"
        );
      } else {
        toast.error("Login failed!");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginMutation.mutate(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative bg-white backdrop-blur-md border border-gray-200 p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 border cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={LoginMutation.isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 transition duration-200"
          >
            {LoginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New here?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
