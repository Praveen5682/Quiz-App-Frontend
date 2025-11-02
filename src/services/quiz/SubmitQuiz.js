import axiosInstance from "../axiosMiddleware";

export const SubmitQuiz = async (quizdata) => {
  try {
    const response = await axiosInstance.post("quiz/submit-quiz", quizdata);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
