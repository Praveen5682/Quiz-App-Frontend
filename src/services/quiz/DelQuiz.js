import axiosInstance from "../axiosMiddleware";

export const DelQuiz = async (quizid) => {
  try {
    const response = await axiosInstance.post("quiz/remove-quiz", quizid);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
