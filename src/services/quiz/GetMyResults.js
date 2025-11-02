// src/services/quiz/GetMyResults.js
import axiosInstance from "../axiosMiddleware";

export const GetMyResults = async (userid) => {
  try {
    const response = await axiosInstance.post("quiz/result", { userid });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
