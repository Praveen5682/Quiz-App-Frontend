import axiosInstance from "../axiosMiddleware";

export const GetQuiz = async () => {
  try {
    const response = await axiosInstance.post("quiz/quiz");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
