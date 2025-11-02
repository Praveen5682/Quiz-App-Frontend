// src/context/AuthContext.jsx
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

// Helper: map role string → roleId
const getRoleId = (role) => {
  if (role === "teacher") return 1;
  if (role === "student") return 2;
  return null;
};

// Helper: decode token field safely
const getFromToken = (field) => {
  const token = localStorage.getItem("accesstoken");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded[field] ?? null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accesstoken"));
  const [userId, setUserId] = useState(() => getFromToken("userId"));
  const [role, setRole] = useState(() => getFromToken("role")); // "teacher" | "student"
  const [roleId, setRoleId] = useState(() => {
    const role = getFromToken("role");
    return role ? getRoleId(role) : null;
  });

  const login = useCallback((data) => {
    const decoded = jwtDecode(data.token);
    const { userId, role, name } = decoded;

    const id = getRoleId(role); // 1 or 2

    // Save to localStorage
    localStorage.setItem("accesstoken", data.token);
    localStorage.setItem("userid", userId);
    localStorage.setItem("fullname", name);
    localStorage.setItem("role", role); // string
    localStorage.setItem("roleid", id); // number as string

    // Update state
    setToken(data.token);
    setUserId(userId);
    setRole(role);
    setRoleId(id);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
    localStorage.removeItem("roleid");

    setToken(null);
    setUserId(null);
    setRole(null);
    setRoleId(null);
  }, []);

  // Token expiry check
  useEffect(() => {
    if (!token) return;

    const check = () => {
      try {
        const { exp } = jwtDecode(token);
        if (exp < Date.now() / 1000) {
          logout();
          toast.error("Session expired. Please log in again.");
        }
      } catch {
        logout();
      }
    };

    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role, // "teacher" | "student"
        roleId, // 1 | 2
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
